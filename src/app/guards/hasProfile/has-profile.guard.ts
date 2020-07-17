import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DiverService } from 'src/app/services/diver/diver.service';
import { map, switchMap } from 'rxjs/operators';
import { Diver } from 'src/app/models/diver.model';

@Injectable({
  providedIn: 'root'
})
export class HasProfileGuard implements CanActivate {

  constructor(public authService: AuthService, public diverService: DiverService, public router: Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.getUser()
      .pipe(
        switchMap((user: firebase.User) => {
          if (!user) {
            this.router.navigate(['login'])
            return of(false)
          }
          return this.diverService.getDiver(user.uid)
            .pipe(
              map((diver: Diver) => {
                if (!diver) {
                  this.router.navigate(['divers/create'])
                }
                return !!diver
              })
            )
        }));
  }

}
