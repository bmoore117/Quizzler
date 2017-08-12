import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkActivation(route, state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkActivation(route, state);
  }

  checkActivation(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (sessionStorage.getItem('id_token')) {
      return true;
    }

    this.authService.redirectUrl = state.url;

    this.router.navigate(['login']);
    return false;
  }
}
