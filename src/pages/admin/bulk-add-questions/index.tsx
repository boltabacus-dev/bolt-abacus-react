import { FC, useEffect, useState } from 'react';

import SeoComponent from '@components/atoms/SeoComponent';
import LoadingBox from '@components/organisms/LoadingBox';
import ErrorBox from '@components/organisms/ErrorBox';
import BulkAddQuestionsSection from '@components/sections/admin/BulkAddQuestionsSection';

import { useAuthStore } from '@store/authStore';

import { ERRORS, MESSAGES } from '@constants/app';
import { ADMIN_DASHBOARD, LOGIN_PAGE } from '@constants/routes';

export interface AdminBulkAddQuestionsPageProps {}

const AdminBulkAddQuestionsPage: FC<AdminBulkAddQuestionsPageProps> = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallBackLink, setFallBackLink] = useState<string>(ADMIN_DASHBOARD);
  const [fallBackAction, setFallBackAction] = useState<string>(
    MESSAGES.TRY_AGAIN
  );

  useEffect(() => {
    const loadComponent = async () => {
      if (isAuthenticated) {
        setLoading(false);
        setApiError(null);
      } else {
        setLoading(false);
        setApiError(ERRORS.AUTHENTICATION_ERROR);
        setFallBackLink(LOGIN_PAGE);
        setFallBackAction(MESSAGES.GO_LOGIN);
      }
    };
    loadComponent();
  }, [isAuthenticated]);
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
              <SeoComponent title="Bulk Add Question" />
              <BulkAddQuestionsSection />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminBulkAddQuestionsPage;
