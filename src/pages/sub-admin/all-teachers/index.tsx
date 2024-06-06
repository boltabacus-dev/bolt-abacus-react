import { isAxiosError } from 'axios';
import { FC, useEffect, useState } from 'react';

import SeoComponent from '@components/atoms/SeoComponent';
import LoadingBox from '@components/organisms/LoadingBox';
import ErrorBox from '@components/organisms/ErrorBox';
import ViewAllTeachersSection from '@components/sections/sub-admin/ViewAllTeachersSection';

import { useAuthStore } from '@store/authStore';

import { ERRORS, MESSAGES } from '@constants/app';
import { ADMIN_DASHBOARD, LOGIN_PAGE } from '@constants/routes';
import { getAllTeachersRequest } from '@services/teacher';
import { GetAllTeachersResponse, Teacher } from '@interfaces/apis/teacher';

export interface SubAdminViewAllTeachersPageProps {}

const SubAdminViewAllTeachersPage: FC<
  SubAdminViewAllTeachersPageProps
> = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const authToken = useAuthStore((state) => state.authToken);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallBackLink, setFallBackLink] = useState<string>(ADMIN_DASHBOARD);
  const [fallBackAction, setFallBackAction] = useState<string>(
    MESSAGES.TRY_AGAIN
  );

  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const getAllBatchesData = async () => {
      if (isAuthenticated) {
        try {
          const res = await getAllTeachersRequest(authToken!);
          const getAllTeachersResponse: GetAllTeachersResponse = res.data;
          setTeachers(getAllTeachersResponse.teachers);
          setApiError(null);
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
    getAllBatchesData();
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
              <SeoComponent title="All Teachers" />
              <ViewAllTeachersSection teachers={teachers} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SubAdminViewAllTeachersPage;
