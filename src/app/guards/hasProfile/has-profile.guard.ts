import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DiverService } from 'src/app/services/diver/diver.service';
import { map, switchMap } from 'rxjs/operators';
import { Diver } from 'src/app/models/diver.model';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class HasProfileGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public diverService: DiverService,
    public router: Router,
    public toastController: ToastController,
    public translate: TranslateService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getUser()
      .pipe(
        switchMap((user: firebase.User) => {
          if (!user) {
            // Display error toast
            this.toastController.create({
              message: this.translate.instant('guard.not-auth'),
              duration: 5000,
              color: 'danger',
            }).then(toast => toast.present())
            this.router.navigate(['login'])
            return of(false)
          }
          return this.diverService.getDiverByUid(user.uid)
            .pipe(
              map((diver: Diver) => {
                if (!diver) {
                  // Display error toast
                  this.toastController.create({
                    message: this.translate.instant('guard.no-profile'),
                    duration: 5000,
                    color: 'danger',
                  }).then(toast => toast.present())
                  this.router.navigate(['my-profile/create'])
                }
                return !!diver
              })
            )
        }));
  }

}
