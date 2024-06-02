import { FC, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';

import SeoComponent from '@components/atoms/SeoComponent';
import LoadingBox from '@components/organisms/LoadingBox';
import ErrorBox from '@components/organisms/ErrorBox';
import BulkAddStudentSection from '@components/sections/admin/BulkAddStudentSection';

import { getAllBatchesRequest } from '@services/batch';
import { useAuthStore } from '@store/authStore';

import { Batch, GetAllBatchesResponse } from '@interfaces/apis/batch';
import { ERRORS, MESSAGES } from '@constants/app';
import { ADMIN_DASHBOARD, LOGIN_PAGE } from '@constants/routes';

export interface AdminBulkAddStudentPageProps {}

const AdminBulkAddStudentPage: FC<AdminBulkAddStudentPageProps> = () => {
  const authToken = useAuthStore((state) => state.authToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallBackLink, setFallBackLink] = useState<string>(ADMIN_DASHBOARD);
  const [fallBackAction, setFallBackAction] = useState<string>(
    MESSAGES.TRY_AGAIN
  );

  const [batches, setBatches] = useState<Array<Batch>>();

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
              <SeoComponent title="Add Student" />
              <BulkAddStudentSection batches={batches!} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminBulkAddStudentPage;
