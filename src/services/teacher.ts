import axios from '@helpers/axios';

import {
  ADD_TEACHER_ENDPOINT,
  GET_ALL_TEACHERS_ENDPOINT,
  GET_ALL_TEACHERS_V2_ENDPOINT,
  GET_ALL_TEACHER_BATCHES_ENDPOINT,
  GET_BATCH_REPORT_ENDPOINT,
  GET_BATCH_STUDENTS_ENDPOINT,
  GET_STUDENT_PROGRESS_ENDPOINT,
  SEARCH_STUDENT_BY_NAME_V2_ENDPOINT,
  UPDATE_BATCH_LINK_ENDPOINT,
  UPDATE_CLASS_ENDPOINT,
} from '@constants/routes';

export const addTeacherRequest = async (
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
  token: string
) => {
  return axios.post(
    ADD_TEACHER_ENDPOINT,
    {
      firstName,
      lastName,
      phoneNumber,
      email,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};

export const getAllTeachersRequest = async (token: string) => {
  return axios.get(GET_ALL_TEACHERS_ENDPOINT, {
    headers: { 'AUTH-TOKEN': token },
  });
};

export const getAllTeachersRequestV2 = async (token: string) => {
  return axios.get(GET_ALL_TEACHERS_V2_ENDPOINT, {
    headers: { 'AUTH-TOKEN': token },
  });
};

export const getTeacherBatchDetails = async (token: string) => {
  return axios.get(GET_ALL_TEACHER_BATCHES_ENDPOINT, {
    headers: { 'AUTH-TOKEN': token },
  });
};

export const updateBatchLink = async (
  batchId: number,
  link: string,
  token: string
) => {
  return axios.post(
    UPDATE_BATCH_LINK_ENDPOINT,
    {
      batchId,
      link,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};

export const updateClassRequest = async (batchId: number, token: string) => {
  return axios.post(
    UPDATE_CLASS_ENDPOINT,
    {
      batchId,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};

export const getBatchReportRequest = async (
  batchId: number,
  levelId: number,
  classId: number,
  topicId: number,
  token: string
) => {
  return axios.post(
    GET_BATCH_REPORT_ENDPOINT,
    {
      batchId,
      levelId,
      classId,
      topicId,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};

export const getStudentProgressRequest = async (
  userId: number,
  token: string
) => {
  return axios.post(
    GET_STUDENT_PROGRESS_ENDPOINT,
    {
      userId,
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

export const searchStudentsRequest = async (name: string, token: string) => {
  return axios.post(
    SEARCH_STUDENT_BY_NAME_V2_ENDPOINT,
    {
      name,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};
