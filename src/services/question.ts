import axios from '@helpers/axios';

import {
  ADD_QUESTION_ENDPOINT,
  GET_ALL_QUIZ_QUESTIONS_ENDPOINT,
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
