import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isAxiosError } from 'axios';

import SeoComponent from '@components/atoms/SeoComponent';
import LoadingBox from '@components/organisms/LoadingBox';
import ErrorBox from '@components/organisms/ErrorBox';

import { useAuthStore } from '@store/authStore';
import { getStudentsRequest } from '@services/teacher';
import { isValidId } from '@helpers/paramsValidator';

import { TeacherStudent } from '@interfaces/StudentsFile';
import { BatchStudentsPageParams } from '@interfaces/RouteParams';

import { ERRORS, MESSAGES } from '@constants/app';
import { LOGIN_PAGE, TEACHER_DASHBOARD } from '@constants/routes';
import { GetStudentsResponse } from '@interfaces/apis/teacher';
import ViewAllStudentsSection from '@components/sections/teacher/ViewAllStudentsSection';

export interface TeacherViewStudentsPageProps {}

const TeacherViewStudentsPage: FC<TeacherViewStudentsPageProps> = () => {
  const params = useParams<BatchStudentsPageParams>();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const authToken = useAuthStore((state) => state.authToken);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallBackLink, setFallBackLink] = useState<string>(TEACHER_DASHBOARD);
  const [fallBackAction, setFallBackAction] = useState<string>(
    MESSAGES.TRY_AGAIN
  );

  const [students, setStudents] = useState<TeacherStudent[]>([]);

  useEffect(() => {
    const getAllBatchesData = async () => {
      if (isAuthenticated) {
        try {
          if (!isValidId(params.batchId!)) {
            setApiError(ERRORS.INVALID_BATCH);
            setFallBackLink(TEACHER_DASHBOARD);
            setFallBackAction(MESSAGES.GO_DASHBOARD);
            setLoading(false);
          } else {
            const id = parseInt(params.batchId!, 10);
            const res = await getStudentsRequest(id, authToken!);
            const getStudentsResponse: GetStudentsResponse = res.data;
            setStudents(getStudentsResponse.students);
            setApiError(null);
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
    getAllBatchesData();
  }, [authToken, isAuthenticated, params.batchId]);
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
              <SeoComponent title="All Students" />
              <ViewAllStudentsSection students={students} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherViewStudentsPage;
