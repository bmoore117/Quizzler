import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import Answer from '../models/answer';
import Question from '../models/question';
import Results from '../models/results';
import { AuthHttp } from './auth-http.service';
import { EventbusService } from './eventbus.service';

@Injectable()
export class QuestionService {

  questionIdx: BehaviorSubject<number>;
  maxQuestionId: BehaviorSubject<number>;
  quizActive: BehaviorSubject<boolean>;
  private answers: Answer[];

  constructor(private http: AuthHttp, private eventBus: EventbusService) {
    this.questionIdx = new BehaviorSubject(1);
    this.maxQuestionId = new BehaviorSubject(1); // default init val
    this.quizActive = new BehaviorSubject(false);
    this.answers = [];

    this.eventBus.loggedIn.subscribe(isLoggedIn => {
      if (isLoggedIn === true) {
        this.http.get('api/question/max')
        .map((response: Response) => {
          return response.json()._id;
        }).subscribe(data => {
          this.maxQuestionId.next(data);
          this.answers = new Array(5);
        });
      }
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

  isOnFirstQuestion(): boolean {
    return this.questionIdx.getValue() === 1 && this.answers.length === 0;
  }

  storeAnswer(answer: Answer) {
    this.questionIdx.next(answer._id + 1);
    this.answers[answer._id - 1] = answer;
  }

  getAnswer(idx: number): string {
    idx--; // switch to 0-based for array indices
    let result: string;

    if (idx < this.answers.length) {
      const answer = this.answers[idx];
      if (answer !== undefined) {
        // TO-DO: question answer system has been designed to potentially allow
        // for multiple answers for a question, e.g. a form with checkboxes.
        // but the only thing implemented is single-answer multiple choice,
        // and here the multi-answer paradigm collapses when we do answers[0]
        result = answer.answers[0];
      }
    }

    return result;
  }

  getScore(): Observable<Results> {
    return this.http.get('api/score?submission=' + JSON.stringify(this.answers))
    .map((response: Response) => {
      return response.json();
    });
  }

  reset(): void {
    this.answers = [];
    this.questionIdx.next(1);
    this.quizActive.next(false);
  }
}
