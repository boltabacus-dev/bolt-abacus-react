import { FC, useEffect, useState } from 'react';

import SeoComponent from '@components/atoms/SeoComponent';
import ErrorBox from '@components/organisms/ErrorBox';
import LoadingBox from '@components/organisms/LoadingBox';

import { useAuthStore } from '@store/authStore';
import { ERRORS, MESSAGES } from '@constants/app';
import { LOGIN_PAGE, STUDENT_DASHBOARD } from '@constants/routes';
import PracticeSection from '@components/sections/student/practice/PracticeSection';

export interface StudentPracticePageProps {}

const StudentPracticePage: FC<StudentPracticePageProps> = () => {
  const authToken = useAuthStore((state) => state.authToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallBackLink, setFallBackLink] = useState<string>(STUDENT_DASHBOARD);
  const [fallBackAction, setFallBackAction] = useState<string>(
    MESSAGES.TRY_AGAIN
  );

  useEffect(() => {
    const getDashboardData = async () => {
      if (isAuthenticated) {
        setLoading(false);
      } else {
        setLoading(false);
        setApiError(ERRORS.AUTHENTICATION_ERROR);
        setFallBackLink(LOGIN_PAGE);
        setFallBackAction(MESSAGES.GO_LOGIN);
      }
    };
    getDashboardData();
  }, [authToken, isAuthenticated]);

  return (
    <div className="flex flex-1">
      {loading ? (
        <>
          <SeoComponent title="Loading" />
          <LoadingBox />
        </>
      ) : (
        <div className="flex flex-1">
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
            <div className="flex-1 pt-4">
              <SeoComponent title="Practice Page" />
              <PracticeSection />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentPracticePage;
