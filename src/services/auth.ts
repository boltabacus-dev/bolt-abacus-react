import axios from '@helpers/axios';

import { LOGIN_ENDPOINT } from '@constants/routes';

export const loginRequest = async (email: string, password: string) => {
  return axios.post(LOGIN_ENDPOINT, {
    email,
    password,
  });
};
