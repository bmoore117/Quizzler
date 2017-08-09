import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from './auth-http.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class QuestionService {

  constructor(private http: AuthHttp) { }

  fetchQuestion(id: number): Observable<any> {
    return this.http.get('api/question/' + id)
      .map((response: Response) => {
        return response.json();
      });
  }
}
