import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isAxiosError } from 'axios';

import SeoComponent from '@components/atoms/SeoComponent';
import ErrorBox from '@components/organisms/ErrorBox';
import LoadingBox from '@components/organisms/LoadingBox';
import StudentProgressSection from '@components/sections/student/ProgressSection';

import { useAuthStore } from '@store/authStore';
import { getProgressRequest } from '@services/student';
import {
  GetStudentProgressResponse,
  LevelProgress,
} from '@interfaces/apis/teacher';
import { StudentProgressPageParams } from '@interfaces/RouteParams';

import { ERRORS, MESSAGES } from '@constants/app';
import { LOGIN_PAGE, STUDENT_DASHBOARD } from '@constants/routes';

export interface StudentProgressPageProps {}

const StudentProgressPage: FC<StudentProgressPageProps> = () => {
  const params = useParams<StudentProgressPageParams>();

  const authToken = useAuthStore((state) => state.authToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallBackLink, setFallBackLink] = useState<string>(STUDENT_DASHBOARD);
  const [fallBackAction, setFallBackAction] = useState<string>(
    MESSAGES.TRY_AGAIN
  );

  const [studentProgress, setStudentProgress] = useState<LevelProgress[]>();
  const [batchName, setBatchName] = useState<string>();

  useEffect(() => {
    const getStudentProgressData = async () => {
      if (isAuthenticated) {
        try {
          const res = await getProgressRequest(authToken!);
          if (res.status === 200) {
            const getStudentProgressResponse: GetStudentProgressResponse =
              res.data;

            setStudentProgress(getStudentProgressResponse.levels);
            setBatchName(getStudentProgressResponse.batchName);
          }
        } catch (error) {
          if (isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 401 || status === 403 || status === 404) {
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
      } else {
        setApiError(ERRORS.AUTHENTICATION_ERROR);
        setFallBackLink(LOGIN_PAGE);
        setFallBackAction(MESSAGES.GO_LOGIN);
      }
      setLoading(false);
    };
    getStudentProgressData();
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
              <SeoComponent title="Student Report" />
              <StudentProgressSection
                batchName={batchName!}
                progress={studentProgress!}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentProgressPage;
