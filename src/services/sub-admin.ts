import axios from '@helpers/axios';

import { ADD_SUB_ADMIN_ENDPOINT } from '@constants/routes';

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
