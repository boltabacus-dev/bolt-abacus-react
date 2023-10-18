import { QuizAnswer, QuizQuestion } from '@interfaces/apis/student';

export const getInitialQuizAnswers = (quizQuestions: Array<QuizQuestion>) => {
  const quizAnswers: Array<QuizAnswer> = [];

  quizQuestions.map((question) => {
    return quizAnswers.push({
      questionId: question.questionId,
      answer: null,
    });
  });

  return quizAnswers;
};
