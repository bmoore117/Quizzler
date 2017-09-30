import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Auth0Lock from 'auth0-lock';

import { AuthHttp } from './auth-http.service';

@Injectable()
export class AuthService {

  lock: Auth0Lock;

  constructor(private http: AuthHttp, private router: Router) {
    this.lock = new Auth0Lock('BqmY5UFBAz6oOVFASRW30QeSzQkj0pUj', 'bmoore.auth0.com', {
      autoClose: true,
      auth: {
        redirectUrl: 'http://localhost:3000/callback',
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
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('exp', (authResult.idTokenPayload.exp as number * 1000).toString());
  }

  logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('exp');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = +localStorage.getItem('exp');
    return new Date().getTime() < expiresAt;
  }
}
