import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import SeoComponent from '@components/atoms/SeoComponent';
import ErrorBox from '@components/organisms/ErrorBox';
import LoadingBox from '@components/organisms/LoadingBox';
import SetPracticeSection from '@components/sections/student/practice/SetSection';

import { areValidPracticeParams } from '@helpers/paramsValidator';
import { PracticePageParams } from '@interfaces/RouteParams';

import { useAuthStore } from '@store/authStore';
import { LOGIN_PAGE, STUDENT_DASHBOARD } from '@constants/routes';
import { ERRORS, MESSAGES } from '@constants/app';

export interface StudentSetPracticePageProps {}

const StudentSetPracticePage: FC<StudentSetPracticePageProps> = () => {
  const params = useParams<PracticePageParams>();

  const authToken = useAuthStore((state) => state.authToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallBackLink, setFallBackLink] = useState<string>(STUDENT_DASHBOARD);
  const [fallBackAction, setFallBackAction] = useState<string>(
    MESSAGES.GO_DASHBOARD
  );

  useEffect(() => {
    const getLevelData = async () => {
      if (isAuthenticated) {
        if (!areValidPracticeParams(params.operation!)) {
          setApiError(ERRORS.INVALID_QUIZ);
          setFallBackLink(STUDENT_DASHBOARD);
          setFallBackAction(MESSAGES.GO_DASHBOARD);
        }
        setLoading(false);
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
              <SeoComponent title="Practice" />
              <SetPracticeSection operation={params.operation!} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentSetPracticePage;
