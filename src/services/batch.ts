import axios from '@helpers/axios';

import {
  GET_ALL_BATCHES_ENDPOINT,
  ADD_BATCH_ENDPOINT,
} from '@constants/routes';

export const getAllBatchesRequest = async (token: string) => {
  return axios.get(GET_ALL_BATCHES_ENDPOINT, {
    headers: { 'AUTH-TOKEN': token },
  });
};

export const addBatchRequest = async (
  batchName: string,
  timeDay: string,
  timeSchedule: string,
  userId: number,
  token: string
) => {
  return axios.post(
    ADD_BATCH_ENDPOINT,
    {
      batchName,
      timeDay,
      timeSchedule,
      userId,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};
