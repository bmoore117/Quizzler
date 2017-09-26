import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

import Results from '../../../models/results';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  results: Results;

  constructor(private questionService: QuestionService, private authService: AuthService) {}

  ngOnInit(): void {
    this.results = new Results();
    this.questionService.getScore().subscribe(data => {
      this.results = data;
    });
  }

  logout() {
    this.authService.logout();
  }
}
