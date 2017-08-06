import { Component, Injectable, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html'
})
@Injectable()
export class QuizComponent implements OnInit {

  constructor(private questionService: QuestionService) {}

  model: any = undefined;

  ngOnInit(): void {
    this.questionService.fetchQuestion(1).subscribe(data => {
      console.log(data);
      this.model = JSON.stringify(data);
    });
  }
}
