import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import Auth0Lock from 'auth0-lock';

import { AuthHttp } from './auth-http.service';

@Injectable()
export class AuthService {

  lock: any;

  constructor(private http: AuthHttp, private router: Router) {
    this.lock = new Auth0Lock('BqmY5UFBAz6oOVFASRW30QeSzQkj0pUj', 'bmoore.auth0.com', {
      oidcConformant: true,
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

  public handleAuthentication(): void {
    this.lock.on('authenticated', (authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.router.navigate(['/']);
      }
    });

    this.lock.on('authorization_error', (err) => {
      this.router.navigate(['/']);
      console.log(err);
      alert(`Error: ${err.error}. Check the console for further details.`);
    });
  }


  public login() {
    this.lock.show();
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
