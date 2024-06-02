import { z } from 'zod';
import validator from 'validator';

import {
  Question,
  QuestionAPI,
  QuestionsFileRowType,
} from '@interfaces/QuestionsFile';
import { Student, StudentsFileRowType } from '@interfaces/StudentsFile';

// Bulk Add Questions

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

export const questionsToQuestionsAPI = (
  questions: Question[]
): QuestionAPI[] => {
  let result: QuestionAPI[] = [];

  result = questions.map((question) => {
    return {
      question: {
        numbers: question.numbers,
        operator: question.operation,
      },
      correctAnswer: question.correctAnswer,
    };
  });

  return result;
};

// Bulk Add Students

export const nameSchema = z.string().min(1, 'First Name is required').trim();
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Invalid email')
  .trim();
export const phoneSchema = z
  .string()
  .trim()
  .refine(
    (val) =>
      validator.isMobilePhone(val, validator.isMobilePhoneLocales, {
        strictMode: true,
      }),
    'Enter valid phone number with country code'
  );

export const parseStudents = (
  fileStudents: StudentsFileRowType[]
): Student[] => {
  let students: Student[] = [];

  students = fileStudents.map((student, index) => {
    try {
      nameSchema.parse(student.firstName);
    } catch {
      throw new Error(`Student first name at line ${index + 2} is not valid`);
    }

    try {
      nameSchema.parse(student.lastName);
    } catch {
      throw new Error(`Student last name at line ${index + 2} is not valid`);
    }

    try {
      phoneSchema.parse(student.phoneNumber);
    } catch {
      throw new Error(`Student phone number at line ${index + 2} is not valid`);
    }

    try {
      emailSchema.parse(student.email);
    } catch {
      throw new Error(`Student email at line ${index + 2} is not valid`);
    }

    return student;
  });

  return students;
};

export const createTableStudents = (students: Student[]) => {
  const table = document.createElement('table');
  table.className =
    'w-full border border-black border-separate border-spacing-1';
  const cols = Object.keys(students[0]);

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

  students.forEach((item) => {
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

export const createErrors = (
  existing: string[],
  multiple: string[],
  errors: string[]
) => {
  const createEmailList = (emails: string[], title: string): string => {
    return `
      <div class="mb-4">
        <h3 class="text-sm font-semibold mb-2">${title}</h3>
        ${
          emails.length > 0
            ? `<ul class="pl-4 list-disc list-inside">${emails
                .map((email) => `<li>${email}</li>`)
                .join('')}</ul>`
            : '<p class="pl-4 text-gray-500">None</p>'
        }
      </div>
    `;
  };

  return `
    <div class="flex items-center w-full">
      <div class="p-2 shadow flex flex-col justify-center items-start text-left">
        ${createEmailList(existing, 'Students with existing emails are: ')}
        ${createEmailList(
          multiple,
          'Students with duplicate emails in the csv file: '
        )}
        ${createEmailList(
          errors,
          'Students emails which caused unknown errors: '
        )}
      </div>
    </div>
  `;
};
