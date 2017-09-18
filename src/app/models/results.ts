import Question from './question';

export default class Results {
  score: number;
  incorrect: Result[];
}

class Result {
  isCorrect: boolean;
  selected: any[];
  question: Question;
}
