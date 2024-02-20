import { FC, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { useParams } from 'react-router-dom';

import SeoComponent from '@components/atoms/SeoComponent';
import ErrorBox from '@components/organisms/ErrorBox';
import LoadingBox from '@components/organisms/LoadingBox';
import QuizSection from '@components/sections/student/quiz/QuizSection';

import { useAuthStore } from '@store/authStore';
import { quizRequest } from '@services/student';
import { areValidQuizParams } from '@helpers/paramsValidator';
import {
  QuizAnswer,
  QuizQuestion,
  QuizResponse,
} from '@interfaces/apis/student';
import { QuizPageParams } from '@interfaces/RouteParams';
import { LOGIN_PAGE, STUDENT_DASHBOARD } from '@constants/routes';
import { ERRORS, MESSAGES } from '@constants/app';
import { getInitialQuizAnswers } from '@helpers/quiz';

export interface StudentQuizPageProps {}

const StudentQuizPage: FC<StudentQuizPageProps> = () => {
  const params = useParams<QuizPageParams>();

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

  useEffect(() => {
    const getLevelData = async () => {
      if (isAuthenticated) {
        if (
          !areValidQuizParams(
            params.levelId!,
            params.classId!,
            params.topicId!,
            params.quizType!
          )
        ) {
          setApiError(ERRORS.INVALID_QUIZ);
          setFallBackLink(STUDENT_DASHBOARD);
          setFallBackAction(MESSAGES.GO_DASHBOARD);
          setLoading(false);
        } else {
          try {
            const levelId = parseInt(params.levelId!, 10);
            const classId = parseInt(params.classId!, 10);
            const topicId = parseInt(params.topicId!, 10);
            const quizType =
              params.quizType === 'classwork' ? 'Classwork' : 'Homework';

            const res = await quizRequest(
              levelId,
              classId,
              topicId,
              quizType,
              authToken!
            );

            if (res.status === 200) {
              setApiError(null);
              const quizResponse: QuizResponse = res.data;
              setQuizQuestions(quizResponse.questions);
              setQuizAnswers(getInitialQuizAnswers(quizResponse.questions));
              setQuizId(quizResponse.quizId);
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
              <SeoComponent title="Quiz" />
              <QuizSection
                quizId={quizId!}
                quizQuestions={quizQuestions!}
                quizAnswers={quizAnswers}
                setQuizAnswers={setQuizAnswers}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentQuizPage;
