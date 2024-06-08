import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isAxiosError } from 'axios';

import SeoComponent from '@components/atoms/SeoComponent';
import ErrorBox from '@components/organisms/ErrorBox';
import LoadingBox from '@components/organisms/LoadingBox';

import { useAuthStore } from '@store/authStore';
import { isValidId } from '@helpers/paramsValidator';
import { getStudentProgressRequest } from '@services/teacher';
import {
  GetStudentProgressResponse,
  LevelProgress,
} from '@interfaces/apis/teacher';
import { StudentProgressPageParams } from '@interfaces/RouteParams';

import { ERRORS, MESSAGES } from '@constants/app';
import { LOGIN_PAGE, ADMIN_DASHBOARD } from '@constants/routes';
import AdminStudentProgressSection from '@components/sections/admin/StudentProgressSection';

export interface AdminStudentProgressPageProps {}

const AdminStudentProgressPage: FC<AdminStudentProgressPageProps> = () => {
  const params = useParams<StudentProgressPageParams>();

  const authToken = useAuthStore((state) => state.authToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallBackLink, setFallBackLink] = useState<string>(ADMIN_DASHBOARD);
  const [fallBackAction, setFallBackAction] = useState<string>(
    MESSAGES.TRY_AGAIN
  );

  const [studentProgress, setStudentProgress] = useState<LevelProgress[]>();
  const [studentName, setStudentName] = useState<string>();
  const [batchName, setBatchName] = useState<string>();

  useEffect(() => {
    const getStudentProgressData = async () => {
      if (isAuthenticated) {
        if (!isValidId(params.studentId!)) {
          setApiError(ERRORS.INVALID_STUDENT);
          setFallBackLink(ADMIN_DASHBOARD);
          setFallBackAction(MESSAGES.GO_DASHBOARD);
          setLoading(false);
        } else {
          const id = parseInt(params.studentId!, 10);
          try {
            const res = await getStudentProgressRequest(id, authToken!);
            if (res.status === 200) {
              const getStudentProgressResponse: GetStudentProgressResponse =
                res.data;

              setStudentProgress(getStudentProgressResponse.levels);
              setStudentName(
                `${getStudentProgressResponse.firstName} ${getStudentProgressResponse.lastName}`
              );
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
              <AdminStudentProgressSection
                studentName={studentName!}
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

export default AdminStudentProgressPage;
