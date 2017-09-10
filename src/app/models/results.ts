import Question from './question';

export interface Results {
  score: number;
  incorrect: Result[];
}

export default interface Result {
  selected: any[];
  question: Question[];
}
