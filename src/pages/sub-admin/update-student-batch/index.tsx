import { FC, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';

import SeoComponent from '@components/atoms/SeoComponent';
import LoadingBox from '@components/organisms/LoadingBox';
import ErrorBox from '@components/organisms/ErrorBox';

import { getAllBatchesRequest } from '@services/batch';
import { useAuthStore } from '@store/authStore';

import { Batch, GetAllBatchesResponse } from '@interfaces/apis/batch';
import { ERRORS, MESSAGES } from '@constants/app';
import { SUB_ADMIN_DASHBOARD, LOGIN_PAGE } from '@constants/routes';
import { StudentBatchDetails } from '@interfaces/StudentsFile';
import { getStudentBatchDetailsRequest } from '@services/sub-admin';
import { useNavigate, useParams } from 'react-router-dom';
import { UpdateStudentBatchPageParams } from '@interfaces/RouteParams';
import { isValidId } from '@helpers/paramsValidator';
import { GetStudentBatchDetailsResponse } from '@interfaces/apis/sub-admin';
import UpdateStudentBatchSection from '@components/sections/sub-admin/UpdateStudentBatchSection';

export interface SubAdminUpdateStudentBatchPageProps {}

const SubAdminUpdateStudentBatchPage: FC<
  SubAdminUpdateStudentBatchPageProps
> = () => {
  const params = useParams<UpdateStudentBatchPageParams>();
  const navigate = useNavigate();

  const authToken = useAuthStore((state) => state.authToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallBackLink, setFallBackLink] = useState<string>(SUB_ADMIN_DASHBOARD);
  const [fallBackAction, setFallBackAction] = useState<string>(
    MESSAGES.TRY_AGAIN
  );

  const [batches, setBatches] = useState<Array<Batch>>();
  const [studentDetails, setStudentDetails] = useState<StudentBatchDetails>();

  useEffect(() => {
    const getAllBatchesData = async () => {
      if (isAuthenticated) {
        try {
          const res = await getAllBatchesRequest(authToken!);
          if (res.status === 200) {
            const allBatchesResponse: GetAllBatchesResponse = res.data;
            setBatches(allBatchesResponse.batches);
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

    const getStudentBatchesData = async () => {
      if (isAuthenticated) {
        if (!isValidId(params.studentId!)) {
          navigate(SUB_ADMIN_DASHBOARD);
        }
        try {
          const studentId = parseInt(params.studentId!, 10);
          const res = await getStudentBatchDetailsRequest(
            studentId!,
            authToken!
          );
          if (res.status === 200) {
            const studentBatchDetailsResponse: GetStudentBatchDetailsResponse =
              res.data;
            setStudentDetails(studentBatchDetailsResponse);
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
      await getStudentBatchesData();
      await getAllBatchesData();
      setLoading(false);
    };

    loadData();
  }, [authToken, isAuthenticated, navigate, params.studentId]);

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
              <SeoComponent title="Update Student Batch" />
              <UpdateStudentBatchSection
                userId={parseInt(params.studentId!, 10)}
                student={studentDetails!}
                batches={batches!}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SubAdminUpdateStudentBatchPage;
