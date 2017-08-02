import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthHttp {

  constructor(private http: Http) {}

  createAuthHeader(headers: Headers) {
    const credential = sessionStorage.getItem('id_token');
    if (credential) {
      headers.append('Authorization', 'Bearer ' + credential);
    } // TODO else kick out to login
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

  postWithToken(url, token, data) {
    const headers = new Headers();
    headers.append('Authorization', token);
    return this.http.post(url, data, {
      headers: headers
    });
  }
}
