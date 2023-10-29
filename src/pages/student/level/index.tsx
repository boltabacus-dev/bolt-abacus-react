import { FC, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { useParams } from 'react-router-dom';

import SeoComponent from '@components/atoms/SeoComponent';
import ErrorBox from '@components/organisms/ErrorBox';
import LoadingBox from '@components/organisms/LoadingBox';

import { useAuthStore } from '@store/authStore';
import { isValidLevelId } from '@helpers/paramsValidator';
import { ERRORS, MESSAGES } from '@constants/app';
import {
  LOGIN_PAGE,
  STUDENT_DASHBOARD,
  STUDENT_LEVEL,
} from '@constants/routes';
import { levelRequest } from '@services/student';
import {
  ClassSchema,
  ClassProgress,
  LevelResponse,
} from '@interfaces/apis/student';
import { LevelPageParams } from '@interfaces/RouteParams';
import { createClassAccordions } from '@helpers/level';

export interface StudentLevelPageProps {}

const StudentLevelPage: FC<StudentLevelPageProps> = () => {
  const params = useParams<LevelPageParams>();

  const authToken = useAuthStore((state) => state.authToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallBackLink, setFallBackLink] = useState<string>(STUDENT_LEVEL);
  const [fallBackAction, setFallBackAction] = useState<string>(
    MESSAGES.TRY_AGAIN
  );

  const [levelId, setLevelId] = useState<number>();
  const [isLatestLevel, setIsLatestLevel] = useState<boolean>(false);
  const [levelSchema, setLevelSchema] = useState<Array<ClassSchema>>();
  const [latestClass, setLatestClass] = useState<number>();
  const [classProgress, setClassProgress] = useState<Array<ClassProgress>>();

  useEffect(() => {
    const getLevelData = async () => {
      if (isAuthenticated) {
        if (!isValidLevelId(params.levelId!)) {
          setApiError(ERRORS.INVALID_LEVEL);
          setFallBackLink(STUDENT_DASHBOARD);
          setFallBackAction(MESSAGES.GO_DASHBOARD);
          setLoading(false);
        } else {
          try {
            const id = parseInt(params.levelId!, 10);
            setLevelId(id);
            const res = await levelRequest(id, authToken!);

            if (res.status === 200) {
              const levelResponse: LevelResponse = res.data;
              setIsLatestLevel(levelResponse.isLatestLevel);
              setLatestClass(levelResponse.latestClass);
              setLevelSchema(levelResponse.schema);
              setClassProgress(levelResponse.progress);
              setApiError(null);
            }
          } catch (error) {
            if (isAxiosError(error)) {
              const status = error.response?.status;
              if (status === 403) {
                setApiError(error.response?.data?.message);
                setFallBackLink(STUDENT_DASHBOARD);
                setFallBackAction(MESSAGES.GO_DASHBOARD);
              } else {
                setApiError(ERRORS.SERVER_ERROR);
              }
            } else {
              setApiError(ERRORS.SERVER_ERROR);
            }
          } finally {
            setLoading(false);
          }
        }
      } else {
        setLoading(false);
        setApiError(ERRORS.AUTHENTICATION_ERROR);
        setFallBackLink(LOGIN_PAGE);
        setFallBackAction(MESSAGES.GO_LOGIN);
      }
    };
    getLevelData();
  }, [authToken, isAuthenticated, params]);

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
              <SeoComponent title="Invalid Level" />
              <ErrorBox
                errorMessage={apiError}
                link={fallBackLink}
                buttonText={fallBackAction}
              />
            </>
          ) : (
            <>
              <SeoComponent title={`Level ${params.levelId}`} />
              <div className="flex flex-col gap-4 p-6 justify-evenly tablet:justify-between tablet:items-center tablet:p-10 tablet:gap-8 desktop:p-20">
                {createClassAccordions(
                  levelId!,
                  latestClass!,
                  isLatestLevel,
                  levelSchema!,
                  classProgress!
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentLevelPage;
