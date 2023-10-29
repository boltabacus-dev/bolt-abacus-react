import axios from '@helpers/axios';

import { GET_ALL_QUIZ_QUESTIONS_ENDPOINT } from '@constants/routes';

export const getAllQuizQuestionsRequest = async (
  levelId: number,
  classId: number,
  topicId: number,
  quizType: string,
  token: string
) => {
  return axios.post(
    GET_ALL_QUIZ_QUESTIONS_ENDPOINT,
    {
      levelId,
      classId,
      topicId,
      quizType,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};
