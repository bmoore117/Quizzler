import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class EventbusService {

  loggedIn: BehaviorSubject<boolean>;
  idToken: BehaviorSubject<string>;

  constructor() {
    this.loggedIn = new BehaviorSubject(undefined);
    this.idToken = new BehaviorSubject(undefined);
  }
}
