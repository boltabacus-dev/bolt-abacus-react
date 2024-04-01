import axios from '@helpers/axios';

import {
  ADD_QUESTION_ENDPOINT,
  BULK_ADD_QUESTION_ENDPOINT,
  EDIT_QUESTION_ENDPOINT,
  GET_ALL_QUIZ_QUESTIONS_ENDPOINT,
  GET_QUESTION_ENDPOINT,
} from '@constants/routes';

export const addQuestionsRequest = async (
  levelId: number,
  classId: number,
  topicId: number,
  quizType: string,
  question: {
    operator: string;
    numbers: number[];
  },
  correctAnswer: number,
  token: string
) => {
  return axios.post(
    ADD_QUESTION_ENDPOINT,
    {
      levelId,
      classId,
      topicId,
      quizType,
      question,
      correctAnswer,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};

export const bulkAddQuestionsRequest = async (
  levelId: number,
  classId: number,
  topicId: number,
  quizType: string,
  questions: {
    question: {
      operator: string;
      numbers: number[];
    };
    correctAnswer: number;
  }[],
  token: string
) => {
  return axios.post(
    BULK_ADD_QUESTION_ENDPOINT,
    {
      levelId,
      classId,
      topicId,
      quizType,
      questions,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};

export const editQuestionsRequest = async (
  questionId: number,
  question: {
    operator: string;
    numbers: number[];
  },
  correctAnswer: number,
  token: string
) => {
  return axios.post(
    EDIT_QUESTION_ENDPOINT,
    {
      questionId,
      question,
      correctAnswer,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};

export const getQuestionRequest = async (questionId: number, token: string) => {
  return axios.post(
    GET_QUESTION_ENDPOINT,
    {
      questionId,
    },
    {
      headers: {
        'AUTH-TOKEN': token,
      },
    }
  );
};

export const getAllQuizQuestionsRequest = async (
  levelId: number,
  classId: number,
  topicId: number,
  quizType: string,
  token: string
) => {
  return axios.post(
    GET_ALL_QUIZ_QUESTIONS_ENDPOINT,
    {
      levelId,
      classId,
      topicId,
      quizType,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};
