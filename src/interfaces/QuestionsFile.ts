export type QuestionsFileRowType = {
  numbers: string;
  operation: string;
  correctAnswer: string;
};

export type Question = {
  numbers: number[];
  operation: string;
  correctAnswer: number;
};

export type QuestionAPI = {
  question: {
    operator: string;
    numbers: number[];
  };
  correctAnswer: number;
};
