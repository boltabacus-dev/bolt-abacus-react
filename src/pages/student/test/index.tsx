import { FC, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { useParams } from 'react-router-dom';

import SeoComponent from '@components/atoms/SeoComponent';
import ErrorBox from '@components/organisms/ErrorBox';
import LoadingBox from '@components/organisms/LoadingBox';
import TestSection from '@components/sections/student/quiz/TestSection';

import { useAuthStore } from '@store/authStore';
import { quizRequest } from '@services/student';
import { areValidTestParams } from '@helpers/paramsValidator';
import {
  QuizAnswer,
  QuizQuestion,
  QuizResponse,
} from '@interfaces/apis/student';
import { TestPageParams } from '@interfaces/RouteParams';
import { LOGIN_PAGE, STUDENT_DASHBOARD } from '@constants/routes';
import { ERRORS, MESSAGES } from '@constants/app';
import { getInitialQuizAnswers } from '@helpers/quiz';
import { minutesToSeconds } from '@helpers/timer';

export interface StudentTestPageProps {}

const StudentTestPage: FC<StudentTestPageProps> = () => {
  const params = useParams<TestPageParams>();

  const authToken = useAuthStore((state) => state.authToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallBackLink, setFallBackLink] = useState<string>(STUDENT_DASHBOARD);
  const [fallBackAction, setFallBackAction] = useState<string>(
    MESSAGES.GO_DASHBOARD
  );

  const [quizQuestions, setQuizQuestions] = useState<Array<QuizQuestion>>([]);
  const [quizId, setQuizId] = useState<number>();
  const [quizAnswers, setQuizAnswers] = useState<Array<QuizAnswer>>([]);
  const [timeInSeconds, setTimeInSeconds] = useState<number>();
  const [expiryTimestamp, setExpiryTimestamp] = useState<Date>(new Date());
  const [level, setLevel] = useState<number>();

  const setTimer = (minutes: number) => {
    const timestamp = new Date();
    timestamp.setSeconds(timestamp.getSeconds() + minutes * 60);
    setTimeInSeconds(minutesToSeconds(minutes));
    setExpiryTimestamp(timestamp);
  };

  useEffect(() => {
    const getLevelData = async () => {
      if (isAuthenticated) {
        if (!areValidTestParams(params.levelId!, params.classId!)) {
          setApiError(ERRORS.INVALID_QUIZ);
          setFallBackLink(STUDENT_DASHBOARD);
          setFallBackAction(MESSAGES.GO_DASHBOARD);
          setLoading(false);
        } else {
          try {
            const levelId = parseInt(params.levelId!, 10);
            const classId = parseInt(params.classId!, 10);
            const quizType = 'Test';

            setLevel(levelId);

            const res = await quizRequest(
              levelId,
              classId,
              0,
              quizType,
              authToken!
            );

            if (res.status === 200) {
              setApiError(null);
              const quizResponse: QuizResponse = res.data;
              setQuizQuestions(quizResponse.questions);
              setQuizAnswers(getInitialQuizAnswers(quizResponse.questions));
              setQuizId(quizResponse.quizId);

              setTimer(quizResponse.time);
            }
          } catch (error) {
            if (isAxiosError(error)) {
              const status = error.response?.status;
              if (status === 403) {
                setApiError(
                  error.response?.data?.error ||
                    error.response?.data?.message ||
                    ERRORS.SERVER_ERROR
                );
                setFallBackLink(STUDENT_DASHBOARD);
                setFallBackAction(MESSAGES.GO_DASHBOARD);
              } else {
                setApiError(ERRORS.SERVER_ERROR);
              }
            } else {
              setApiError(ERRORS.SERVER_ERROR);
            }
          } finally {
            setLoading(false);
          }
        }
      } else {
        setLoading(false);
        setApiError(ERRORS.AUTHENTICATION_ERROR);
        setFallBackLink(LOGIN_PAGE);
        setFallBackAction(MESSAGES.GO_LOGIN);
      }
    };
    getLevelData();
  }, [authToken, isAuthenticated, params]);

  return (
    <div>
      {loading ? (
        <>
          <SeoComponent title="Loading" />
          <LoadingBox />
        </>
      ) : (
        <div>
          {apiError ? (
            <>
              <SeoComponent title="Error" />
              <ErrorBox
                errorMessage={apiError}
                link={fallBackLink}
                buttonText={fallBackAction}
              />
            </>
          ) : (
            <>
              <SeoComponent title="Test" />
              <TestSection
                levelId={level!}
                quizId={quizId!}
                quizQuestions={quizQuestions!}
                quizAnswers={quizAnswers}
                setQuizAnswers={setQuizAnswers}
                totalSeconds={timeInSeconds!}
                expiryTimestamp={expiryTimestamp!}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentTestPage;
