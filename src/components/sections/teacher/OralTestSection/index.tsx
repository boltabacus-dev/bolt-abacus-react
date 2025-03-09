import { FC, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';

import ErrorMessage from '@components/atoms/ErrorMessage';

import { useAuthStore } from '@store/authStore';
import { oralTestRequest } from '@services/student';
import { QuizQuestion, QuizResponse } from '@interfaces/apis/student';

import { ERRORS } from '@constants/app';

export interface OralTestSectionProps {}

const OralTestSection: FC<OralTestSectionProps> = () => {
  const authToken = useAuthStore((state) => state.authToken);

  const [levelId, setLevelId] = useState(1);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = async () => {
    try {
      const res = await oralTestRequest(levelId, authToken!);

      if (res.status === 200) {
        setApiError(null);
        const quizResponse: QuizResponse = res.data;
        setQuizQuestions(quizResponse.questions);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          setApiError(
            error.response?.data?.error ||
              error.response?.data?.message ||
              ERRORS.SERVER_ERROR
          );
        } else {
          setApiError(ERRORS.SERVER_ERROR);
        }
      } else {
        setApiError(ERRORS.SERVER_ERROR);
      }
    }
  };

  return (
    <div className="tablet:p-10 desktop:px-36 flex flex-col justify-evenly tablet:justify-between tablet:items-center gap-10 px-6 py-2">
      <div className="flex flex-col gap-10 w-full">
        <p className="font-bold text-gold text-xl">Oral Test Questions</p>
        <div className="w-full">
          <select
            onChange={(e) => setLevelId(Number(e.target.value))}
            className="px-2 py-1 border border-grey rounded-md focus:outline-none w-full text-black text-center"
          >
            <option value={1} className="w-full">
              Level 1
            </option>
          </select>
          {apiError ? (
            <div className="flex justify-center text-xl text-center">
              <ErrorMessage errMessage={apiError} iconRequired />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OralTestSection;
