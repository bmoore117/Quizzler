import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { AuthHttp } from './auth-http.service';

@Injectable()
export class AuthService {

  isLoggedIn: BehaviorSubject<boolean>;
  redirectUrl: string;
  jwtHelper: JwtHelper;
  
  constructor(private http: AuthHttp) {
    this.isLoggedIn = new BehaviorSubject(false);
    this.jwtHelper = new JwtHelper();
  }

  login(username: String, password: String): Observable<boolean> {
    console.log('doing login');
    const token = 'Basic ' + btoa(username + ':' + password);

    return this.http.postWithToken('/api/login', token, undefined)
      .map((response: Response) => {
        console.log('checking response');
        if (response.status === 200) {
          const jwt = response.json();
          sessionStorage.setItem('id_token', jwt);
          this.checkLoggedIn();
          return true;
        } else {
          return false;
        }
      });
  }

  logout(): void {
    sessionStorage.removeItem('id_token');
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    var token = sessionStorage.getItem('id_token');

    if(token != undefined) {
      this.isLoggedIn.next(true);
      return this.jwtHelper.isTokenExpired(token);
    } else {
      this.isLoggedIn.next(false);
      return false;
    }
  }

  getLoggedInUser(): string {
    var token = this.jwtHelper.decodeToken(sessionStorage.getItem('id_token'));
    return token.username;
  }
}
