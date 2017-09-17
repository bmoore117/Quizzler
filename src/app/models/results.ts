import Question from './question';

export default class Results {
  score: number;
  incorrect: Result[];
}

class Result {
  selected: any[];
  question: Question;
}
