import { Component, Injectable, OnInit } from '@angular/core';
import { ParamMap, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import Answer from '../../../models/answer';
import Question from '../../../models/question';
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

  constructor(private questionService: QuestionService, private router: Router,
    private route: ActivatedRoute) {
    this.model = new Question();
    this.questionService.quizActive.next(true);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: ParamMap) => {
      const id = +params['id'];

      if (id > 1 && this.questionService.isOnFirstQuestion()) {
        this.router.navigate(['home/quiz/1']);
      }

      this.questionService.fetchQuestion(id).subscribe(data => {
        this.model = data;
      });
      this.selection = this.questionService.getAnswer(id);
    });
  }

  advance(): void {
    this.questionService.storeAnswer(new Answer(this.model._id, [+this.selection]));
    this.selection = undefined;

    if (this.questionService.isOnLastQuestion()) {
      this.router.navigate(['/home/result']);
    } else {
      const nextQuestion = this.model._id + 1;
      this.router.navigate(['home/quiz/' + nextQuestion]);
    }
  }
}
