import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router,
    public toastController: ToastController,
    public translate: TranslateService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.isAuthenticated()
        .pipe(
          map((isAuthenticated: boolean) => {
            if (!isAuthenticated) {
              // Display error toast
              this.toastController.create({
                message: this.translate.instant('guard.not-auth'),
                duration: 5000,
                color: 'danger',
              }).then(toast => toast.present())
              this.router.navigate(['login'])
            }
            return isAuthenticated;
          }));
  }
  
}
