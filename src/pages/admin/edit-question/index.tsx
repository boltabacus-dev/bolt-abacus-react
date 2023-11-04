import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isAxiosError } from 'axios';

import SeoComponent from '@components/atoms/SeoComponent';
import ErrorBox from '@components/organisms/ErrorBox';
import LoadingBox from '@components/organisms/LoadingBox';

import { getQuestionRequest } from '@services/question';
import { useAuthStore } from '@store/authStore';
import { isValidId } from '@helpers/paramsValidator';

import { EditQuestionPageParams } from '@interfaces/RouteParams';
import { QuizQuestion } from '@interfaces/apis/admin';
import { ERRORS, MESSAGES } from '@constants/app';
import { ADMIN_DASHBOARD, LOGIN_PAGE } from '@constants/routes';
import EditQuestionSection from '@components/sections/admin/EditQuestionSection';

export interface AdminEditQuestionPageProps {}

const AdminEditQuestionPage: FC<AdminEditQuestionPageProps> = () => {
  const params = useParams<EditQuestionPageParams>();
  const navigate = useNavigate();

  const authToken = useAuthStore((state) => state.authToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallBackLink, setFallBackLink] = useState<string>(ADMIN_DASHBOARD);
  const [fallBackAction, setFallBackAction] = useState<string>(
    MESSAGES.TRY_AGAIN
  );

  const [questionData, setQuestionData] = useState<QuizQuestion>();

  useEffect(() => {
    const getQuestionData = async () => {
      if (isAuthenticated) {
        if (!isValidId(params.questionId!)) {
          navigate(ADMIN_DASHBOARD);
        }
        try {
          const questionId = parseInt(params.questionId!, 10);
          const res = await getQuestionRequest(questionId, authToken!);

          if (res.status === 200) {
            const getQuestionResponse: QuizQuestion = res.data;
            setQuestionData(getQuestionResponse);
            setApiError(null);
          }
        } catch (error) {
          if (isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 401) {
              setApiError(error.response?.data?.message);
              setFallBackLink(LOGIN_PAGE);
              setFallBackAction(MESSAGES.GO_LOGIN);
            } else {
              setApiError(ERRORS.SERVER_ERROR);
            }
          } else {
            setApiError(ERRORS.SERVER_ERROR);
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setApiError(ERRORS.AUTHENTICATION_ERROR);
        setFallBackLink(LOGIN_PAGE);
        setFallBackAction(MESSAGES.GO_LOGIN);
      }
    };
    getQuestionData();
  }, [authToken, isAuthenticated, navigate, params.questionId]);

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
              <SeoComponent title="Edit Question" />
              <EditQuestionSection question={questionData!} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminEditQuestionPage;
