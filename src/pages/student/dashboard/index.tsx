import { FC, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';

import SeoComponent from '@components/atoms/SeoComponent';
import ErrorBox from '@components/organisms/ErrorBox';
import LoadingBox from '@components/organisms/LoadingBox';
import InfoSection from '@components/sections/student/dashboard/InfoSection';
import RoadmapSection from '@components/sections/student/dashboard/RoadMapSection';
import WelcomeSection from '@components/sections/student/dashboard/WelcomeSection';

import { dashboardRequest } from '@services/student';
import { useAuthStore } from '@store/authStore';
import { ERRORS, MESSAGES, NO_OF_CLASSES } from '@constants/app';
import { LOGIN_PAGE, STUDENT_DASHBOARD } from '@constants/routes';
import { DashboardResponse } from '@interfaces/apis/student';

export interface StudentDashboardPageProps {}

const StudentDashboardPage: FC<StudentDashboardPageProps> = () => {
  const authToken = useAuthStore((state) => state.authToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallBackLink, setFallBackLink] = useState<string>(STUDENT_DASHBOARD);
  const [fallBackAction, setFallBackAction] = useState<string>(
    MESSAGES.TRY_AGAIN
  );

  const [currentLevel, setCurrentLevel] = useState<number>();
  const [currentClass, setCurrentClass] = useState<number>();
  const [classLink, setClassLink] = useState<string>();
  const [progress, setProgress] = useState<number>();

  useEffect(() => {
    const getDashboardData = async () => {
      if (isAuthenticated) {
        try {
          const res = await dashboardRequest(authToken!);
          if (res.status === 200) {
            const dashboardResponse: DashboardResponse = res.data;
            setCurrentLevel(dashboardResponse.levelId);
            setCurrentClass(dashboardResponse.latestClass);
            setClassLink(dashboardResponse.latestLink);
            setApiError(null);
            setProgress((dashboardResponse.latestClass / NO_OF_CLASSES) * 100);
          }
        } catch (error) {
          if (isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 401) {
              setApiError(
                error.response?.data?.error ||
                  error.response?.data?.message ||
                  ERRORS.SERVER_ERROR
              );
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
    getDashboardData();
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
              <WelcomeSection classLink={classLink!} />
              <InfoSection
                currentLevel={currentLevel!}
                description={`Class ${currentClass!}`}
                progress={progress!}
              />
              <RoadmapSection
                currentLevel={currentLevel!}
                currentClass={currentClass!}
                progress={progress!}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDashboardPage;
