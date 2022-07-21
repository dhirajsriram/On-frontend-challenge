export interface Answer {
  id: number;
  copy: string;
  nextQuestion: number;
  ratingIncrease: {
    [key: string]: number;
  };
}

export interface Question {
  id: number;
  copy: string;
  answers: Answer[];
}

export interface Shoe {
  id: string;
  name: string;
  rating: number;
}
