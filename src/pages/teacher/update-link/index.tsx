import SeoComponent from '@components/atoms/SeoComponent';
import ErrorBox from '@components/organisms/ErrorBox';
import LoadingBox from '@components/organisms/LoadingBox';
import TeacherUpdateLinkSection from '@components/sections/teacher/UpdateLinkSection';
import { ERRORS, MESSAGES } from '@constants/app';
import { LOGIN_PAGE, TEACHER_DASHBOARD } from '@constants/routes';
import { isValidId } from '@helpers/paramsValidator';
import { UpdateBatchLinkPageParams } from '@interfaces/RouteParams';
import { useAuthStore } from '@store/authStore';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export interface TeacherUpdateLinkPageProps {}

const TeacherUpdateLinkPage: FC<TeacherUpdateLinkPageProps> = () => {
  const params = useParams<UpdateBatchLinkPageParams>();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallBackLink, setFallBackLink] = useState<string>(TEACHER_DASHBOARD);
  const [fallBackAction, setFallBackAction] = useState<string>(
    MESSAGES.TRY_AGAIN
  );

  const [batchId, setBatchId] = useState<number>();

  useEffect(() => {
    const loadComponent = async () => {
      if (isAuthenticated) {
        if (!isValidId(params.batchId!)) {
          setApiError(ERRORS.INVALID_BATCH);
          setFallBackLink(TEACHER_DASHBOARD);
          setFallBackAction(MESSAGES.GO_DASHBOARD);
          setLoading(false);
        } else {
          const id = parseInt(params.batchId!, 10);
          setBatchId(id);
        }
      } else {
        setApiError(ERRORS.AUTHENTICATION_ERROR);
        setFallBackLink(LOGIN_PAGE);
        setFallBackAction(MESSAGES.GO_LOGIN);
      }
      setLoading(false);
    };
    loadComponent();
  }, [isAuthenticated, params]);

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
              <SeoComponent title="Update Zoom Link" />
              <TeacherUpdateLinkSection batchId={batchId!} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherUpdateLinkPage;
