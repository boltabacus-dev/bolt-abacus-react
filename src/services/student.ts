import axios from '@helpers/axios';

import { STUDENT_DASHBOARD_ENDPOINT } from '@constants/routes';

export const dashboardRequest = async (token: string) => {
  return axios.get(STUDENT_DASHBOARD_ENDPOINT, {
    headers: { 'AUTH-TOKEN': token },
  });
};
