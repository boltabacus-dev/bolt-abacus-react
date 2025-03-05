import axios from '@helpers/axios';

import {
  ADD_STUDENT_ENDPOINT,
  STUDENT_PROGRESS_ENDPOINT,
  STUDENT_DASHBOARD_ENDPOINT,
  STUDENT_LEVEL_ENDPOINT,
  STUDENT_QUIZ_ENDPOINT,
  STUDENT_QUIZ_SUBMIT_ENDPOINT,
  STUDENT_REPORT_ENDPOINT,
  BULK_ADD_STUDENT_ENDPOINT,
  STUDENT_DASHBOARD_V2_ENDPOINT,
  ACCOUNT_DELETION_ENDPOINT,
  ACCOUNT_DEACTIVATION_ENDPOINT,
  STUDENT_LEVEL_V2_ENDPOINT,
  STUDENT_PRACTICE_SUBMIT_ENDPOINT,
} from '@constants/routes';

import { QuizAnswer } from '@interfaces/apis/student';
import { Student } from '@interfaces/StudentsFile';

export const dashboardRequest = async (token: string) => {
  return axios.get(STUDENT_DASHBOARD_ENDPOINT, {
    headers: { 'AUTH-TOKEN': token },
  });
};

export const dashboardRequestV2 = async (token: string) => {
  return axios.get(STUDENT_DASHBOARD_V2_ENDPOINT, {
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

export const levelRequestV2 = async (levelId: number, token: string) => {
  return axios.post(
    STUDENT_LEVEL_V2_ENDPOINT,
    {
      levelId,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};

export const accountDeletionRequest = async (userId: number, token: string) => {
  return axios.post(
    ACCOUNT_DELETION_ENDPOINT,
    {
      userId: userId ?? 0,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};

export const accountDeactivationRequest = async (
  userId: number,
  token: string
) => {
  return axios.post(
    ACCOUNT_DEACTIVATION_ENDPOINT,
    {
      userId,
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

export const oralTestRequest = async (levelId: number, token: string) => {
  // return axios.post(
  //   STUDENT_ORAL_TEST_ENDPOINT,
  //   {
  //     levelId,
  //   },
  //   {
  //     headers: { 'AUTH-TOKEN': token },
  //   }
  // );

  // TODO: Replace this with the oral test route
  return axios.post(
    STUDENT_QUIZ_ENDPOINT,
    {
      levelId,
      classId: 2,
      topicId: 1,
      quizType: 'Homework',
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};

export const finalTestRequest = async (levelId: number, token: string) => {
  // return axios.post(
  //   STUDENT_FINAL_TEST_ENDPOINT,
  //   {
  //     levelId,
  //   },
  //   {
  //     headers: { 'AUTH-TOKEN': token },
  //   }
  // );

  // TODO: Replace this with the final test route
  return axios.post(
    STUDENT_QUIZ_ENDPOINT,
    {
      levelId,
      classId: 2,
      topicId: 1,
      quizType: 'Homework',
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

export const practiceSubmitRequest = async (
  practiceType: string,
  numberOfQuestions: number,
  operation: string,
  numberOfDigits: number,
  score: number,
  totalTime: number,
  averageTime: number,
  token: string
) => {
  return axios.post(
    STUDENT_PRACTICE_SUBMIT_ENDPOINT,
    {
      practiceType,
      numberOfQuestions,
      operation,
      numberOfDigits,
      score,
      totalTime,
      averageTime,
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

export const bulkAddStudentRequest = async (
  students: Student[],
  batchId: number,
  token: string
) => {
  return axios.post(
    BULK_ADD_STUDENT_ENDPOINT,
    {
      students,
      batchId,
    },
    {
      headers: { 'AUTH-TOKEN': token },
      timeout: 600000,
    }
  );
};
