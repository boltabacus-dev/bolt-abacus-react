import axios from '@helpers/axios';

import { GET_LEVEL_SCHEMA_ENDPOINT } from '@constants/routes';

export const getLevelSchemaRequest = async (levelId: number, token: string) => {
  return axios.post(
    GET_LEVEL_SCHEMA_ENDPOINT,
    {
      levelId,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};
