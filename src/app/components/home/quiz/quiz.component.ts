import { Component, Injectable, OnInit } from '@angular/core';
import { MdButtonModule, MdCardModule, MdRadioModule } from '@angular/material';

import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html'
})
@Injectable()
export class QuizComponent implements OnInit {

  constructor(private questionService: QuestionService) {}

  model: any;
  questionIdx: number;
  selection: string;

  ngOnInit(): void {
    this.questionIdx = 1;

    this.questionService.fetchQuestion(this.questionIdx).subscribe(data => {
      this.model = data;
    });
  }

  advance(): void {
    // TODO: validate fields?
    this.questionIdx++;

    this.questionService.fetchQuestion(this.questionIdx).subscribe(data => {
      this.model = data;
    });
  }
}
