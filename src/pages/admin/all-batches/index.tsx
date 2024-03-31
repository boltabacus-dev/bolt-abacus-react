import { FC, useEffect, useState } from 'react';

import SeoComponent from '@components/atoms/SeoComponent';
import LoadingBox from '@components/organisms/LoadingBox';
import ErrorBox from '@components/organisms/ErrorBox';

import { useAuthStore } from '@store/authStore';

import { ERRORS, MESSAGES } from '@constants/app';
import { ADMIN_DASHBOARD, LOGIN_PAGE } from '@constants/routes';
import ViewAllBatchesSection from '@components/sections/admin/ViewAllBatchesSection';
import { isAxiosError } from 'axios';
import { allBatchesRequest } from '@services/admin';
import { Batch, GetAllBatchesResponse } from '@interfaces/apis/batch';

export interface AdminViewAllBatchesPageProps {}

const AdminViewAllBatchesPage: FC<AdminViewAllBatchesPageProps> = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const authToken = useAuthStore((state) => state.authToken);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallBackLink, setFallBackLink] = useState<string>(ADMIN_DASHBOARD);
  const [fallBackAction, setFallBackAction] = useState<string>(
    MESSAGES.TRY_AGAIN
  );

  const [batches, setBatches] = useState<Batch[]>([]);

  useEffect(() => {
    const getAllBatchesData = async () => {
      if (isAuthenticated) {
        try {
          const res = await allBatchesRequest(authToken!);
          const getAllBatchesResponse: GetAllBatchesResponse = res.data;
          setBatches(getAllBatchesResponse.batches);
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
              <SeoComponent title="All Batches" />
              <ViewAllBatchesSection batches={batches} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminViewAllBatchesPage;
