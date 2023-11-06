import axios from '@helpers/axios';

import { LOGIN_ENDPOINT, RESET_PASSWORD_ENDPOINT } from '@constants/routes';

export const loginRequest = async (email: string, password: string) => {
  return axios.post(LOGIN_ENDPOINT, {
    email,
    password,
  });
};

export const resetPasswordRequest = async (password: string, token: string) => {
  return axios.post(
    RESET_PASSWORD_ENDPOINT,
    {
      password,
    },
    {
      headers: {
        'AUTH-TOKEN': token,
      },
    }
  );
};
