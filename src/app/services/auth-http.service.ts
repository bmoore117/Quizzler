import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { AuthService } from './auth.service';

@Injectable()
export class AuthHttp {

  constructor(private http: Http) {}

  credential: string;

  createAuthHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' + this.credential);
  }

  get(url) {
    const headers = new Headers();
    this.createAuthHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url, data) {
    const headers = new Headers();
    this.createAuthHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }
}
