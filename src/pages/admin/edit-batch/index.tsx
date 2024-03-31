import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isAxiosError } from 'axios';

import SeoComponent from '@components/atoms/SeoComponent';
import ErrorBox from '@components/organisms/ErrorBox';
import LoadingBox from '@components/organisms/LoadingBox';
import EditBatchSection from '@components/sections/admin/EditBatchSection';

import { getBatchRequest } from '@services/batch';
import { useAuthStore } from '@store/authStore';
import { isValidId } from '@helpers/paramsValidator';

import { EditBatchPageParams } from '@interfaces/RouteParams';
import { Batch } from '@interfaces/apis/batch';

import { ERRORS, MESSAGES } from '@constants/app';
import { ADMIN_DASHBOARD, LOGIN_PAGE } from '@constants/routes';

export interface AdminEditBatchPageProps {}

const AdminEditBatchPage: FC<AdminEditBatchPageProps> = () => {
  const params = useParams<EditBatchPageParams>();
  const navigate = useNavigate();

  const authToken = useAuthStore((state) => state.authToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallBackLink, setFallBackLink] = useState<string>(ADMIN_DASHBOARD);
  const [fallBackAction, setFallBackAction] = useState<string>(
    MESSAGES.TRY_AGAIN
  );

  const [batchDetails, setBatchDetails] = useState<Batch>();

  useEffect(() => {
    const getBatchDetails = async () => {
      if (isAuthenticated) {
        if (!isValidId(params.batchId!)) {
          navigate(ADMIN_DASHBOARD);
        }
        try {
          const batchId = parseInt(params.batchId!, 10);
          const res = await getBatchRequest(batchId, authToken!);

          if (res.status === 200) {
            const getBatchResponse: Batch = res.data;
            setBatchDetails(getBatchResponse);
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
    getBatchDetails();
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
              <SeoComponent title="Edit Batch" />
              <EditBatchSection batch={batchDetails!} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminEditBatchPage;
