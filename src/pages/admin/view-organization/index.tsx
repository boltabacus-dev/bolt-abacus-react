import { FC, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';

import SeoComponent from '@components/atoms/SeoComponent';
import LoadingBox from '@components/organisms/LoadingBox';
import ErrorBox from '@components/organisms/ErrorBox';
import ViewOrganizationSection from '@components/sections/admin/ViewOrganizationSection';

import { useAuthStore } from '@store/authStore';

import { getAllTagNamesRequest } from '@services/organization';
import { GetAllTagNamesResponse } from '@interfaces/apis/organization';

import { ERRORS, MESSAGES } from '@constants/app';
import { ADMIN_DASHBOARD, LOGIN_PAGE } from '@constants/routes';

export interface AdminViewOrganizationPageProps {}

const AdminViewOrganizationPage: FC<AdminViewOrganizationPageProps> = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const authToken = useAuthStore((state) => state.authToken);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallBackLink, setFallBackLink] = useState<string>(ADMIN_DASHBOARD);
  const [fallBackAction, setFallBackAction] = useState<string>(
    MESSAGES.TRY_AGAIN
  );

  const [tagNames, setTagNames] = useState<string[]>([]);

  useEffect(() => {
    const getAllBatchesData = async () => {
      if (isAuthenticated) {
        try {
          const res = await getAllTagNamesRequest(authToken!);
          if (res.status === 200) {
            const allTagNamesResponse: GetAllTagNamesResponse = res.data;
            setTagNames(allTagNamesResponse.tagNames!);
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
              <SeoComponent title="View Organization" />
              <ViewOrganizationSection tagNames={tagNames} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminViewOrganizationPage;
