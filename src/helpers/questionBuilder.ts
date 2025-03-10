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
  numberOfDigitsLeft: number,
  numberOfDigitsRight: number,
  numberOfQuestions: number,
  numberOfRows: number,
  zigZag: boolean,
  includeSubtraction: boolean,
  persistNumberOfDigits: boolean,
  includeDecimals: boolean
): QuizQuestion[] => {
  const questions: QuizQuestion[] = [];

  for (let i = 0; i < numberOfQuestions; i += 1) {
    let numbers: number[] = [];

    if (operation === 'addition') {
      for (let j = 0; j < numberOfRows; j += 1) {
        const currentMin = zigZag ? 1 : 10 ** (numberOfDigitsLeft - 1);
        const currentMax = zigZag
          ? 10 ** generateRandomNumber(1, numberOfDigitsLeft) - 1
          : 10 ** numberOfDigitsLeft - 1;
        numbers.push(generateRandomNumber(currentMin, currentMax));
      }

      if (includeSubtraction) {
        for (let j = 0; j < numbers.length; j += 1) {
          if (Math.random() < 0.5) {
            numbers[j] *= -1;
          }
        }
      }

      if (persistNumberOfDigits) {
        let sum = numbers.reduce((a, b) => a + b, 0);
        while (Math.abs(sum).toString().length !== numberOfDigitsLeft) {
          numbers = [];
          for (let j = 0; j < numberOfRows; j += 1) {
            const currentMin = zigZag ? 1 : 10 ** (numberOfDigitsLeft - 1);
            const currentMax = zigZag
              ? 10 ** generateRandomNumber(1, numberOfDigitsLeft) - 1
              : 10 ** numberOfDigitsRight - 1;
            numbers.push(generateRandomNumber(currentMin, currentMax));
          }
          sum = numbers.reduce((a, b) => a + b, 0);
        }
      }
    } else if (operation === 'multiplication') {
      const leftMin = 10 ** (numberOfDigitsLeft - 1);
      const leftMax = 10 ** numberOfDigitsLeft - 1;
      const rightMin = 10 ** (numberOfDigitsRight - 1);
      const rightMax = 10 ** numberOfDigitsRight - 1;

      numbers.push(generateRandomNumber(leftMin, leftMax));
      numbers.push(generateRandomNumber(rightMin, rightMax));
    } else if (operation === 'division') {
      const leftMin = 10 ** (numberOfDigitsLeft - 1);
      const leftMax = 10 ** numberOfDigitsLeft - 1;
      const rightMin = 10 ** (numberOfDigitsRight - 1);
      const rightMax = 10 ** numberOfDigitsRight - 1;

      let num1 = generateRandomNumber(leftMin, leftMax);
      let num2 = generateRandomNumber(rightMin, rightMax);

      if (num1 < num2) {
        [num1, num2] = [num2, num1];
      }

      if (!includeDecimals) {
        while (num1 % num2 !== 0) {
          num1 = generateRandomNumber(leftMin, leftMax);
          num2 = generateRandomNumber(rightMin, rightMax);

          if (num1 < num2) {
            [num1, num2] = [num2, num1];
          }
        }
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
