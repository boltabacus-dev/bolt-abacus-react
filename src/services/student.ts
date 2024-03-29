import axios from '@helpers/axios';

import {
  ADD_STUDENT_ENDPOINT,
  STUDENT_PROGRESS_ENDPOINT,
  STUDENT_DASHBOARD_ENDPOINT,
  STUDENT_LEVEL_ENDPOINT,
  STUDENT_QUIZ_ENDPOINT,
  STUDENT_QUIZ_SUBMIT_ENDPOINT,
  STUDENT_REPORT_ENDPOINT,
} from '@constants/routes';
import { QuizAnswer } from '@interfaces/apis/student';

export const dashboardRequest = async (token: string) => {
  return axios.get(STUDENT_DASHBOARD_ENDPOINT, {
    headers: { 'AUTH-TOKEN': token },
  });
};

export const levelRequest = async (levelId: number, token: string) => {
  return axios.post(
    STUDENT_LEVEL_ENDPOINT,
    {
      levelId,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};

export const quizRequest = async (
  levelId: number,
  classId: number,
  topicId: number,
  quizType: string,
  token: string
) => {
  return axios.post(
    STUDENT_QUIZ_ENDPOINT,
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

export const quizSubmitRequest = async (
  quizId: number,
  time: number,
  answers: Array<QuizAnswer>,
  token: string
) => {
  return axios.post(
    STUDENT_QUIZ_SUBMIT_ENDPOINT,
    {
      answers,
      time,
      quizId,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};

export const reportRequest = async (
  levelId: number,
  classId: number,
  token: string
) => {
  return axios.post(
    STUDENT_REPORT_ENDPOINT,
    {
      levelId,
      classId,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};

export const getProgressRequest = async (token: string) => {
  return axios.post(
    STUDENT_PROGRESS_ENDPOINT,
    {},
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};

export const addStudentRequest = async (
  firstName: string,
  lastName: string,
  phoneNumber: string,
  batchId: number,
  email: string,
  token: string
) => {
  return axios.post(
    ADD_STUDENT_ENDPOINT,
    {
      firstName,
      lastName,
      phoneNumber,
      batchId,
      email,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};
