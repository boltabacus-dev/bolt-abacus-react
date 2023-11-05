/* eslint-disable no-console */
import SeoComponent from '@components/atoms/SeoComponent';
import ErrorBox from '@components/organisms/ErrorBox';
import LoadingBox from '@components/organisms/LoadingBox';
import TeacherDashboardSection from '@components/sections/teacher/DashboardSection';
import { ERRORS, MESSAGES } from '@constants/app';
import { LOGIN_PAGE, TEACHER_DASHBOARD } from '@constants/routes';
import { getTeacherBatchDetails } from '@services/teacher';
import { useAuthStore } from '@store/authStore';
import { isAxiosError } from 'axios';
import { FC, useEffect, useState } from 'react';

export interface TeacherDashboardPageProps {}

const TeacherDashboardPage: FC<TeacherDashboardPageProps> = () => {
  const authToken = useAuthStore((state) => state.authToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallBackLink, setFallBackLink] = useState<string>(TEACHER_DASHBOARD);
  const [fallBackAction, setFallBackAction] = useState<string>(
    MESSAGES.TRY_AGAIN
  );

  useEffect(() => {
    const getBatchDetails = async () => {
      if (isAuthenticated) {
        try {
          const res = await getTeacherBatchDetails(authToken!);

          if (res.status === 200) {
            console.log(res.data);
          }
        } catch (error) {
          if (isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 403) {
              setApiError(error.response?.data?.message);
              setFallBackLink(TEACHER_DASHBOARD);
              setFallBackAction(MESSAGES.GO_DASHBOARD);
            } else if (status === 404) {
              // TODO: Remove this after API integration
              return;
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
    getBatchDetails();
  }, [authToken, isAuthenticated]);

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
              <SeoComponent title="Dashboard" />
              <TeacherDashboardSection />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherDashboardPage;
