import axios from '@helpers/axios';

import {
  GET_ALL_BATCHES_ENDPOINT,
  ADD_BATCH_ENDPOINT,
  GET_BATCH_ENDPOINT,
  EDIT_BATCH_ENDPOINT,
} from '@constants/routes';

export const getAllBatchesRequest = async (token: string) => {
  return axios.get(GET_ALL_BATCHES_ENDPOINT, {
    headers: { 'AUTH-TOKEN': token },
  });
};

export const getBatchRequest = async (batchId: number, token: string) => {
  return axios.post(
    GET_BATCH_ENDPOINT,
    {
      batchId,
    },
    {
      headers: {
        'AUTH-TOKEN': token,
      },
    }
  );
};

export const editBatchRequest = async (
  batchId: number,
  batchName: string,
  timeDay: string,
  timeSchedule: string,
  numberOfStudents: number,
  active: boolean,
  latestLevelId: number,
  latestClassId: number,
  token: string
) => {
  return axios.post(
    EDIT_BATCH_ENDPOINT,
    {
      batchId,
      batchName,
      timeDay,
      timeSchedule,
      numberOfStudents,
      active,
      latestClassId,
      latestLevelId,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
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
