import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { map } from 'rxjs/operators';
import { ErrorService } from 'src/app/services/error/error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router, public errorService: ErrorService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.isAuthenticated()
        .pipe(
          map((isAuthenticated: boolean) => {
            if (!isAuthenticated) {
              this.errorService.getErrorMsgToast(this.errorService.GUARD_TYPE, 'not-auth').then(toast => toast.present())
              this.router.navigate(['login'])
            }
            return isAuthenticated;
          }));
  }
  
}
