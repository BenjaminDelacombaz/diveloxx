import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DiverService } from 'src/app/services/diver/diver.service';
import { map, switchMap } from 'rxjs/operators';
import { Diver } from 'src/app/models/diver.model';
import { ErrorService } from 'src/app/services/error/error.service';

@Injectable({
  providedIn: 'root'
})
export class HasProfileGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public diverService: DiverService,
    public router: Router,
    public errorService: ErrorService,
  ) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.getUser()
      .pipe(
        switchMap((user: firebase.User) => {
          if (!user) {
            this.errorService.getErrorMsgToast(this.errorService.GUARD_TYPE, 'not-auth').then(toast => toast.present())
            this.router.navigate(['login'])
            return of(false)
          }
          return this.diverService.getDiverByUid(user.uid)
            .pipe(
              map((diver: Diver) => {
                if (!diver) {
                  this.errorService.getErrorMsgToast(this.errorService.GUARD_TYPE, 'no-profile').then(toast => toast.present())
                  this.router.navigate(['my-profile/create'])
                }
                return !!diver
              })
            )
        }));
  }

}
