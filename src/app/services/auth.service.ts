import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Auth0Lock from 'auth0-lock';

import { EventbusService } from './eventbus.service';

@Injectable()
export class AuthService {

  lock: Auth0Lock;
  access_token: any;
  id_token: any;
  exp: number;

  constructor(private router: Router, private eventBus: EventbusService) {
    let callbackUrl = window.location.protocol + '//' + window.location.hostname;
    if (window.location.port !== '0' && window.location.port !== '') {
      callbackUrl = callbackUrl + ':' + window.location.port;
    }
    callbackUrl = callbackUrl + '/callback';

    this.lock = new Auth0Lock('BqmY5UFBAz6oOVFASRW30QeSzQkj0pUj', 'bmoore.auth0.com', {
      autoClose: true,
      auth: {
        redirectUrl: callbackUrl,
        responseType: 'token id_token',
        params: {
          scope: 'openid' // Learn about scopes: https://auth0.com/docs/scopes
        }
      }
    });
  }

  handleAuthentication(): void {
    this.lock.on('authenticated', (authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.lock.hide();
        const redirect = sessionStorage.getItem('redirect');
        this.router.navigate([redirect]);
      }
    });
  }

  login(options: any) {
    this.lock.show(options);
  }

  setSession(authResult): void {
    this.access_token = authResult.accessToken;
    this.id_token = authResult.idToken;
    this.exp = authResult.idTokenPayload.exp as number * 1000;

    // publish auth status for other services that need it
    this.eventBus.idToken.next(this.id_token);
    this.eventBus.loggedIn.next(true);
  }

  logout(): void {
    this.access_token = undefined;
    this.id_token = undefined;
    this.exp = undefined;
    this.router.navigate(['/']);

    this.eventBus.idToken.next(undefined);
    this.eventBus.loggedIn.next(false);
  }

  isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this.exp;
  }
}
