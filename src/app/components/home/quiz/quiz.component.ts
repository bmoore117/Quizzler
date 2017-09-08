import { Component, Injectable, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MdButtonModule, MdCardModule, MdRadioModule } from '@angular/material';
import { Router } from '@angular/router';

import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html'
})
@Injectable()
export class QuizComponent implements OnInit {

  model: any;
  selection: string;
  currentRoute: string;

  constructor(private questionService: QuestionService, private router: Router, private location: Location) {
    this.model = {answers: []};
    router.events.subscribe((val) => {
      this.currentRoute = location.path();
    });
  }

  ngOnInit(): void {
    this.questionService.fetchNextQuestion().subscribe(data => {
      this.model = data;
    });
  }

  advance(): void {
    this.questionService.storeAnswer(+this.selection);

    if (this.questionService.isOnLastQuestion()) {
      this.router.navigate(['/home/result']);
      return;
    } else {
      this.selection = undefined; // reset for next question

      this.questionService.fetchNextQuestion().subscribe(data => {
        this.model = data;
      });
    }
  }
}
