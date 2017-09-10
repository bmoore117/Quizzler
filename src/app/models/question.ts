export default interface Question {
  _id: number;
  question: string;
  answers: string[];
  correctAnswers: number[];
}
