import axios from '@helpers/axios';

import {
  ADD_TEACHER_ENDPOINT,
  GET_ALL_TEACHERS_ENDPOINT,
  GET_ALL_TEACHER_BATCHES_ENDPOINT,
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
