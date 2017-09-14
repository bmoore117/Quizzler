import Question from './question';

export default interface Results {
  score: number;
  incorrect: Result[];
}

export interface Result {
  selected: any[];
  question: Question;
}
