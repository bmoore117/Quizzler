import { Component, Injectable, OnInit } from '@angular/core';
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

  constructor(private questionService: QuestionService, private router: Router) {
    this.model = {answers: []};
  }

  ngOnInit(): void {
    this.questionService.fetchNextQuestion().subscribe(data => {
      this.model = data;
    });
  }

  advance(): void {
    this.questionService.storeAnswer({_id: this.model._id, answers: [+this.selection]});

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
