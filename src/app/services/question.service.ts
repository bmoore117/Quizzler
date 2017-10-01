import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import Answer from '../models/answer';
import Question from '../models/question';
import Results from '../models/results';
import { AuthHttp } from './auth-http.service';

@Injectable()
export class QuestionService {

  questionIdx: BehaviorSubject<number>;
  maxQuestionId: BehaviorSubject<number>;
  private answers: Answer[];

  constructor(private http: AuthHttp) {
    this.questionIdx = new BehaviorSubject(1);
    this.maxQuestionId = new BehaviorSubject(1); // default init val
    this.http.get('api/question/max')
      .map((response: Response) => {
        return response.json()._id;
      }).subscribe(data => {
        this.maxQuestionId.next(data);
        this.answers = new Array(5);
      });
  }

  fetchQuestion(idx: number): Observable<Question> {
    return this.http.get('api/question/' + idx)
      .map((response: Response) => {
        return response.json();
      });
  }

  isOnLastQuestion(): boolean {
    return this.questionIdx.getValue() > this.maxQuestionId.getValue();
  }

  storeAnswer(answer: Answer) {
    this.questionIdx.next(answer._id + 1);
    this.answers[answer._id - 1] = answer;
  }

  getScore(): Observable<Results> {
    return this.http.get('api/score?submission=' + JSON.stringify(this.answers))
    .map((response: Response) => {
      this.questionIdx.next(-1);
      return response.json();
    });
  }
}
