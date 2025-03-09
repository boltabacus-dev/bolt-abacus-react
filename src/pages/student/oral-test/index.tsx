import { FC, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { useParams } from 'react-router-dom';

import SeoComponent from '@components/atoms/SeoComponent';
import ErrorBox from '@components/organisms/ErrorBox';
import LoadingBox from '@components/organisms/LoadingBox';
import OralTestSection from '@components/sections/student/quiz/OralTestSection';

import { useAuthStore } from '@store/authStore';
import { oralTestRequest } from '@services/student';
import { isValidLevelId } from '@helpers/paramsValidator';
import {
  QuizAnswer,
  QuizQuestion,
  QuizResponse,
} from '@interfaces/apis/student';
import { OralTestPageParams } from '@interfaces/RouteParams';
import { LOGIN_PAGE, STUDENT_DASHBOARD } from '@constants/routes';
import { ERRORS, MESSAGES } from '@constants/app';
import { getInitialQuizAnswers } from '@helpers/quiz';

export interface StudentOralTestPageProps {}

const StudentOralTestPage: FC<StudentOralTestPageProps> = () => {
  const params = useParams<OralTestPageParams>();

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
  const [level, setLevel] = useState<number>();

  useEffect(() => {
    const getOralTestData = async () => {
      if (isAuthenticated) {
        if (!isValidLevelId(params.levelId!)) {
          setApiError(ERRORS.INVALID_QUIZ);
          setFallBackLink(STUDENT_DASHBOARD);
          setFallBackAction(MESSAGES.GO_DASHBOARD);
          setLoading(false);
        } else {
          try {
            const levelId = parseInt(params.levelId!, 10);

            setLevel(levelId);

            const res = await oralTestRequest(levelId, authToken!);

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
    getOralTestData();
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
              <SeoComponent title="Oral Test" />
              <OralTestSection
                levelId={level!}
                quizId={quizId!}
                quizQuestions={quizQuestions!}
                quizAnswers={quizAnswers}
                setQuizAnswers={setQuizAnswers}
                quizType="oral-test"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentOralTestPage;
