import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Question from '../../../models/question';
import Answer from '../../../models/answer';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
@Injectable()
export class QuizComponent implements OnInit {

  model: Question;
  selection: string;

  constructor(private questionService: QuestionService, private router: Router) {
    this.model = new Question();
  }

  ngOnInit(): void {
    this.questionService.fetchNextQuestion().subscribe(data => {
      this.model = data;
    });
  }

  advance(): void {
    this.questionService.storeAnswer(new Answer(this.model._id, [+this.selection]));

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
