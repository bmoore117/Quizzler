import { QuestionService } from '../../services/question.service';
import { Component, Injectable } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@Injectable()
export class HomeComponent {

  numQuestions: number[];
  currentQuestion: number;

  constructor(private questionService: QuestionService) {
    questionService.maxQuestionId.subscribe(val => {
      // angular is annoying, why can't I just iterate with a number, why does it have
      // to be an array
      this.numQuestions = Array<number>(val);
      for (let i = 0; i < val; i++) {
        this.numQuestions[i] = i + 1;
      }
    });
    questionService.questionIdx.subscribe(val => {
      this.currentQuestion = val;
    });
  }
}
