import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { AuthHttp } from './auth-http.service';

@Injectable()
export class AuthService {

  redirectUrl: string;

  constructor(private http: AuthHttp) {}

  login(username: String, password: String): Observable<boolean> {
    console.log('doing login');
    const token = 'Basic ' + btoa(username + ':' + password);

    return this.http.postWithToken('/api/login', token, undefined)
      .map((response: Response) => {
        console.log('checking response');
        if (response.status === 200) {
          const jwt = response.json();
          sessionStorage.setItem('id_token', jwt);
          return true;
        } else {
          return false;
        }
      });
  }

  logout(): void {
    sessionStorage.removeItem('id_token');
  }
}
