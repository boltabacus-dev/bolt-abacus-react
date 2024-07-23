import axios from '@helpers/axios';

import {
  ADD_SUB_ADMIN_ENDPOINT,
  GET_BATCH_STUDENTS_ENDPOINT,
  GET_BATCH_TEACHER_ENDPOINT,
  GET_STUDENT_BATCH_DETAILS_ENDPOINT,
  UPDATE_BATCH_TEACHER_ENDPOINT,
  UPDATE_STUDENT_BATCH_ENDPOINT,
} from '@constants/routes';

export const addSubAdminRequest = async (
  firstName: string,
  lastName: string,
  phoneNumber: string,
  tagName: string,
  email: string,
  token: string
) => {
  return axios.post(
    ADD_SUB_ADMIN_ENDPOINT,
    {
      firstName,
      lastName,
      phoneNumber,
      tagName,
      email,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};

export const getStudentsRequest = async (batchId: number, token: string) => {
  return axios.post(
    GET_BATCH_STUDENTS_ENDPOINT,
    {
      batchId,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};

export const getStudentBatchDetailsRequest = async (
  userId: number,
  token: string
) => {
  return axios.post(
    GET_STUDENT_BATCH_DETAILS_ENDPOINT,
    {
      userId,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};

export const updateStudentBatchRequest = async (
  userId: number,
  batchId: number,
  token: string
) => {
  return axios.post(
    UPDATE_STUDENT_BATCH_ENDPOINT,
    {
      userId,
      batchId,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};

export const getBatchTeacherRequest = async (
  batchId: number,
  token: string
) => {
  return axios.post(
    GET_BATCH_TEACHER_ENDPOINT,
    {
      batchId,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};

export const updateBatchTeacherRequest = async (
  currentTeacherId: number,
  futureTeacherId: number,
  batchId: number,
  token: string
) => {
  return axios.post(
    UPDATE_BATCH_TEACHER_ENDPOINT,
    {
      currentTeacherId,
      futureTeacherId,
      batchId,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};
