import { GET_ALL_BATCHES_ENDPOINT } from '@constants/routes';
import axios from '@helpers/axios';

export const getAllBatchesRequest = async (token: string) => {
  return axios.get(GET_ALL_BATCHES_ENDPOINT, {
    headers: { 'AUTH-TOKEN': token },
  });
};
