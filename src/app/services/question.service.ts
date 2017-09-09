import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from './auth-http.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class QuestionService {

  private questionIdx: number;
  private lastQuestionIdx: number;
  private answers: number[];

  constructor(private http: AuthHttp) {
    this.questionIdx = 0;
    this.answers = [];
    this.http.get('api/question/max')
      .map((response: Response) => {
        return response.json()._id;
      }).subscribe(data => this.lastQuestionIdx = data);

  }

  fetchNextQuestion(): Observable<any> {
    this.questionIdx++;
    return this.http.get('api/question/' + this.questionIdx)
      .map((response: Response) => {
        return response.json();
      });
  }

  isOnLastQuestion(): boolean {
    return this.questionIdx >= this.lastQuestionIdx;
  }

  storeAnswer(answer: number) {
    this.answers.push(answer);
  }

  getScore(): Observable<number> {
    return this.http.get('api/score?' + JSON.stringify(this.answers))
    .map((response: Response) => {
      return parseInt(response.text(), 10);
    });
  }
}
