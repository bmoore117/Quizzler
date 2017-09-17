import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import Answer from '../models/answer';
import Question from '../models/question';
import Results from '../models/results';
import { AuthHttp } from './auth-http.service';

@Injectable()
export class QuestionService {

  private questionIdx: number;
  private lastQuestionIdx: number;
  private answers: Answer[];

  constructor(private http: AuthHttp) {
    this.questionIdx = 1;
    this.answers = [];
    this.http.get('api/question/max')
      .map((response: Response) => {
        return response.json()._id;
      }).subscribe(data => this.lastQuestionIdx = data);

  }

  fetchNextQuestion(): Observable<Question> {
    return this.http.get('api/question/' + this.questionIdx)
      .map((response: Response) => {
        return response.json();
      });
  }

  isOnLastQuestion(): boolean {
    return this.questionIdx >= this.lastQuestionIdx;
  }

  storeAnswer(answer: Answer) {
    this.questionIdx++;
    this.answers.push(answer);
  }

  getScore(): Observable<Results> {
    return this.http.get('api/score?submission=' + JSON.stringify(this.answers))
    .map((response: Response) => {
      return response.json();
    });
  }
}
