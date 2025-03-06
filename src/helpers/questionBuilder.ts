import {
  QuestionResult,
  QuizAnswer,
  QuizQuestion,
} from '@interfaces/apis/student';

function generateRandomNumber(min: number, max: number): number {
  let num = Math.floor(Math.random() * (max - min + 1)) + min;

  while (num === 0) {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return num;
}

export const generatePracticeQuestions = (
  operation: string,
  numberOfDigits: number,
  numberOfQuestions: number,
  numberOfRows: number,
  zigZag: boolean
): QuizQuestion[] => {
  const questions: QuizQuestion[] = [];

  for (let i = 0; i < numberOfQuestions; i += 1) {
    let numbers: number[] = [];
    const min = zigZag ? 1 : 10 ** (numberOfDigits - 1);
    const max = 10 ** numberOfDigits - 1;

    if (operation === 'addition' || operation === 'multiplication') {
      for (let j = 0; j < numberOfRows; j += 1) {
        numbers.push(generateRandomNumber(min, max));
      }
    } else {
      const divisionMin = 10;
      const divisionMax = 10 ** Math.min(numberOfDigits - 1, 3) - 1;

      let num1 = generateRandomNumber(min, max);
      let num2 = generateRandomNumber(divisionMin, divisionMax);

      if (num1 < num2) {
        [num1, num2] = [num2, num1];
      }

      numbers = [num1, num2];
    }

    const question: QuizQuestion = {
      questionId: i + 1,
      question: {
        operator:
          operation === 'addition'
            ? '+'
            : operation === 'multiplication'
            ? '*'
            : '/',
        numbers,
      },
    };
    questions.push(question);
  }

  return questions;
};

export const generatePracticeAnswers = (
  numberOfQuestions: number
): QuizAnswer[] => {
  const answers: QuizAnswer[] = [];

  for (let i = 0; i < numberOfQuestions; i += 1) {
    answers.push({
      questionId: i + 1,
      answer: null,
    });
  }
  return answers;
};

export const generateResult = (
  questions: QuizQuestion[],
  answers: QuizAnswer[]
) => {
  const result: QuestionResult[] = [];

  for (let i = 0; i < questions.length; i += 1) {
    const { questionId } = questions[i];
    const { question } = questions[i];

    const answer = answers.find((a) => a.questionId === questionId)!;

    let questionString = '';
    let currentAnswer = question.numbers[0];

    for (let j = 0; j < question.numbers.length; j += 1) {
      questionString += question.numbers[j];
      if (j < question.numbers.length - 1) {
        questionString += ` ${question.operator} `;
      }
    }

    for (let j = 1; j < question.numbers.length; j += 1) {
      if (question.operator === '+') {
        currentAnswer += question.numbers[j];
      } else if (question.operator === '*') {
        currentAnswer *= question.numbers[j];
      } else if (question.operator === '/') {
        currentAnswer /= question.numbers[j];
      }
    }

    result.push({
      question: questionString,
      answer: answer.answer,
      verdict: currentAnswer === answer.answer,
    });
  }

  return { result, totalScore: result.filter((r) => r.verdict).length };
};

export const generateTimedResult = (
  questions: QuizQuestion[],
  answers: QuizAnswer[]
) => {
  const result: QuestionResult[] = [];

  for (let i = 0; i < answers.length; i += 1) {
    const { questionId } = answers[i];
    const answer = answers[i];

    const question = questions.find((q) => q.questionId === questionId)!;

    let questionString = '';
    let currentAnswer = question.question.numbers[0];

    for (let j = 0; j < question.question.numbers.length; j += 1) {
      questionString += question.question.numbers[j];
      if (j < question.question.numbers.length - 1) {
        questionString += ` ${question.question.operator} `;
      }
    }

    for (let j = 1; j < question.question.numbers.length; j += 1) {
      if (question.question.operator === '+') {
        currentAnswer += question.question.numbers[j];
      } else if (question.question.operator === '*') {
        currentAnswer *= question.question.numbers[j];
      } else if (question.question.operator === '/') {
        currentAnswer /= question.question.numbers[j];
      }
    }

    result.push({
      question: questionString,
      answer: answer.answer,
      verdict: currentAnswer === answer.answer,
    });
  }

  return { result, totalScore: result.filter((r) => r.verdict).length };
};
