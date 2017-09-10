import { Component, Injectable, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question.service';

import Results from '../../../models/results';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {

  results: Results;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.getScore().subscribe(data => this.results = data);
  }
}
