import axios from '@helpers/axios';

import {
  ADD_SUB_ADMIN_ENDPOINT,
  GET_BATCH_STUDENTS_ENDPOINT,
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
