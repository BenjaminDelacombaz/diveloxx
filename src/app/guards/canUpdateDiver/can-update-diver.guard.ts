import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DiverService } from 'src/app/services/diver/diver.service';
import { ToastController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { switchMap, map, first } from 'rxjs/operators';
import { Diver } from 'src/app/models/diver.model';

@Injectable({
  providedIn: 'root'
})
export class CanUpdateDiverGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private diverService: DiverService,
    private router: Router,
    private toastController: ToastController,
    private translate: TranslateService,
    private navController: NavController,
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
              switchMap((currentDiver: Diver) => {
                if (!currentDiver) {
                  // Display error toast
                  this.toastController.create({
                    message: this.translate.instant('guard.no-profile'),
                    duration: 5000,
                    color: 'danger',
                  }).then(toast => toast.present())
                  this.router.navigate(['my-profile/create'])
                  return of(false)
                }
                return this.diverService.getDiver(next.paramMap.get('id'))
                  .pipe(
                    map((diver: Diver) => {
                      if (!currentDiver.canUpdate(diver)) {
                        // Display error toast
                        this.toastController.create({
                          message: this.translate.instant('guard.no-access'),
                          duration: 5000,
                          color: 'danger',
                        }).then(toast => toast.present())
                        return false
                      }
                      return true
                    })
                  )
              })
            )
        }));
  }

}
