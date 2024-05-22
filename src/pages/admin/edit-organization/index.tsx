import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isAxiosError } from 'axios';

import SeoComponent from '@components/atoms/SeoComponent';
import ErrorBox from '@components/organisms/ErrorBox';
import LoadingBox from '@components/organisms/LoadingBox';
import EditOrganizationSection from '@components/sections/admin/EditOrganizationSection';

import { getTagDetailsRequest } from '@services/organization';
import { useAuthStore } from '@store/authStore';

import { EditOrganizationPageParams } from '@interfaces/RouteParams';
import { TagDetails } from '@interfaces/apis/organization';

import { ERRORS, MESSAGES } from '@constants/app';
import { ADMIN_DASHBOARD, LOGIN_PAGE } from '@constants/routes';

export interface AdminEditOrganizationPageProps {}

const AdminEditOrganizationPage: FC<AdminEditOrganizationPageProps> = () => {
  const params = useParams<EditOrganizationPageParams>();
  const navigate = useNavigate();

  const authToken = useAuthStore((state) => state.authToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallBackLink, setFallBackLink] = useState<string>(ADMIN_DASHBOARD);
  const [fallBackAction, setFallBackAction] = useState<string>(
    MESSAGES.TRY_AGAIN
  );

  const [tagDetails, setTagDetails] = useState<TagDetails>();

  useEffect(() => {
    const getBatchDetails = async () => {
      if (isAuthenticated) {
        try {
          const tagName = params.tagName!;
          const res = await getTagDetailsRequest(tagName, authToken!);

          if (res.status === 200) {
            const getTagDetailsResponse: TagDetails = res.data;
            setTagDetails(getTagDetailsResponse);
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
  }, [authToken, isAuthenticated, navigate, params.tagName]);

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
              <SeoComponent title="Edit Organization" />
              <EditOrganizationSection tagDetails={tagDetails!} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminEditOrganizationPage;
