import axios from '@helpers/axios';

import {
  STUDENT_DASHBOARD_ENDPOINT,
  STUDENT_LEVEL_ENDPOINT,
} from '@constants/routes';

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
