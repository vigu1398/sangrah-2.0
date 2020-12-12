
import { of as observableOf, Observable } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
    return this.authService.isLoggedIn().pipe(
      map(e => {
        return true;
      }),
      catchError((err) => {
        console.log(err);
        this.authService.logout();
        return observableOf(false);
      }));
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
    return this.canActivate(childRoute, state);
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
}
