import { ADD_TEACHER_ENDPOINT } from '@constants/routes';
import axios from '@helpers/axios';

export const addTeacherRequest = async (
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
  token: string
) => {
  return axios.post(
    ADD_TEACHER_ENDPOINT,
    {
      firstName,
      lastName,
      phoneNumber,
      email,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};
