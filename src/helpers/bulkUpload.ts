import { Question, QuestionsFileRowType } from '@interfaces/QuestionsFile';

export const parseQuestions = (
  fileQuestions: QuestionsFileRowType[]
): Question[] => {
  let questions: Question[] = [];

  questions = fileQuestions.map((question, index) => {
    const ques: Question = {
      numbers: [],
      operation: '',
      correctAnswer: 0,
    };

    const correctAnswer = parseInt(question.correctAnswer, 10);
    if (Number.isNaN(correctAnswer)) {
      throw new Error(
        `Correct answer at line ${index + 2} is not in correct format`
      );
    }
    ques.correctAnswer = correctAnswer;

    if (
      question.operation === '+' ||
      question.operation === '/' ||
      question.operation === '*'
    ) {
      ques.operation = question.operation;
    } else {
      throw new Error(`Operation at line ${index + 2} is not of valid type`);
    }

    const nums = question.numbers.split(',');
    const numbers: number[] = nums.map((num) => {
      const number = parseInt(num, 10);
      if (Number.isNaN(number)) {
        throw new Error(
          `Numbers at line ${index + 2} is not in correct format`
        );
      }
      return number;
    });
    ques.numbers = numbers;

    return ques;
  });

  return questions;
};

export const createTable = (questions: Question[]) => {
  const table = document.createElement('table');
  table.className = 'border border-black border-separate border-spacing-1';
  const cols = Object.keys(questions[0]);

  const thead = document.createElement('thead');
  const tr = document.createElement('tr');

  cols.forEach((item) => {
    const th = document.createElement('th');
    th.className = 'p-1';
    th.innerText = item;
    tr.appendChild(th);
  });
  thead.appendChild(tr);
  table.append(tr);

  questions.forEach((item) => {
    const row = document.createElement('tr');

    const val = Object.values(item);

    val.forEach((elem) => {
      const td = document.createElement('td');
      td.className = 'p-1';
      td.innerText = String(elem);
      row.appendChild(td);
    });
    table.appendChild(row);
  });

  return table;
};
