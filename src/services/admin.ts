import axios from '@helpers/axios';

import {
  GET_ALL_BATCHES_ENDPOINT,
  GET_BATCH_STUDENTS_ENDPOINT,
  GET_LEVEL_SCHEMA_ENDPOINT,
} from '@constants/routes';

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

export const allBatchesRequest = async (token: string) => {
  return axios.get(GET_ALL_BATCHES_ENDPOINT, {
    headers: { 'AUTH-TOKEN': token },
  });
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
