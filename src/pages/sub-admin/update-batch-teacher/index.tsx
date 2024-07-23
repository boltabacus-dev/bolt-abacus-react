import { FC, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import SeoComponent from '@components/atoms/SeoComponent';
import LoadingBox from '@components/organisms/LoadingBox';
import ErrorBox from '@components/organisms/ErrorBox';

import { useAuthStore } from '@store/authStore';

import { getBatchTeacherRequest } from '@services/sub-admin';
import { getAllTeachersRequest } from '@services/teacher';

import {
  GetBatchTeacherResponse,
  TeacherDetails,
} from '@interfaces/apis/sub-admin';
import { GetAllTeachersResponse, Teacher } from '@interfaces/apis/teacher';
import { UpdateBatchTeacherPageParams } from '@interfaces/RouteParams';

import { isValidId } from '@helpers/paramsValidator';

import { ERRORS, MESSAGES } from '@constants/app';
import { SUB_ADMIN_DASHBOARD, LOGIN_PAGE } from '@constants/routes';
import UpdateBatchTeacherSection from '@components/sections/sub-admin/UpdateBatchTeacherSection';

export interface SubAdminUpdateBatchTeacherPageProps {}

const SubAdminUpdateBatchTeacherPage: FC<
  SubAdminUpdateBatchTeacherPageProps
> = () => {
  const params = useParams<UpdateBatchTeacherPageParams>();
  const navigate = useNavigate();

  const authToken = useAuthStore((state) => state.authToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallBackLink, setFallBackLink] = useState<string>(SUB_ADMIN_DASHBOARD);
  const [fallBackAction, setFallBackAction] = useState<string>(
    MESSAGES.TRY_AGAIN
  );

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [batchTeacher, setBatchTeacher] = useState<TeacherDetails>();

  useEffect(() => {
    const getAllTeacherData = async () => {
      if (isAuthenticated) {
        try {
          const res = await getAllTeachersRequest(authToken!);
          const getAllTeachersResponse: GetAllTeachersResponse = res.data;
          setTeachers(getAllTeachersResponse.teachers);
          setApiError(null);
        } catch (error) {
          if (isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 401 || status === 402 || status === 403) {
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

    const getBatchesData = async () => {
      if (isAuthenticated) {
        if (!isValidId(params.batchId!)) {
          navigate(SUB_ADMIN_DASHBOARD);
        }
        try {
          const batchId = parseInt(params.batchId!, 10);
          const res = await getBatchTeacherRequest(batchId!, authToken!);
          if (res.status === 200) {
            const getBatchTeacherResponse: GetBatchTeacherResponse = res.data;
            setBatchTeacher(getBatchTeacherResponse.teachers.pop());
            setApiError(null);
          }
        } catch (error) {
          if (isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 401 || status === 403 || status === 402) {
              setApiError(
                error.response?.data?.error ||
                  error.response?.data?.message ||
                  ERRORS.SERVER_ERROR
              );
              setFallBackLink(SUB_ADMIN_DASHBOARD);
              setFallBackAction(MESSAGES.GO_DASHBOARD);
            } else {
              setApiError(ERRORS.SERVER_ERROR);
            }
          } else {
            setApiError(ERRORS.SERVER_ERROR);
          }
        }
      } else {
        setLoading(false);
        setApiError(ERRORS.AUTHENTICATION_ERROR);
        setFallBackLink(LOGIN_PAGE);
        setFallBackAction(MESSAGES.GO_LOGIN);
      }
    };

    const loadData = async () => {
      await getBatchesData();
      await getAllTeacherData();
      setLoading(false);
    };

    loadData();
  }, [authToken, isAuthenticated, navigate, params.batchId]);

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
              <SeoComponent title="Update Batch Teacher" />
              <UpdateBatchTeacherSection
                teachers={teachers}
                batchTeacher={batchTeacher!}
                batchId={parseInt(params.batchId!, 10)}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SubAdminUpdateBatchTeacherPage;
