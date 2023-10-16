import axios from '@helpers/axios';

import { LOGIN_ROUTE } from '@constants/routes';

export const loginRequest = async (email: string, password: string) => {
  return axios.post(LOGIN_ROUTE, {
    email,
    password,
  });
};
