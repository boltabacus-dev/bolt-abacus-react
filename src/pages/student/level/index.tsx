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
import { levelRequestV2 } from '@services/student';
import { ClassProgressV2, LevelResponseV2 } from '@interfaces/apis/student';
import { LevelPageParams } from '@interfaces/RouteParams';
import { createClassAccordionsV2 } from '@helpers/level';

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
  const [progress, setProgress] = useState<Array<ClassProgressV2>>();
  // const [oralTest, setOralTest] = useState<QuizResultV2>();
  // const [finalTest, setFinalTest] = useState<QuizResultV2>();

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
            const res = await levelRequestV2(id, authToken!);

            if (res.status === 200) {
              const levelResponse: LevelResponseV2 = res.data;
              setProgress(levelResponse.progress);
              // setOralTest(levelResponse.oralTest);
              // setFinalTest(levelResponse.finalTest);
              setApiError(null);
            }
          } catch (error) {
            if (isAxiosError(error)) {
              const status = error.response?.status;
              if (status === 403) {
                setApiError(
                  error.response?.data?.error ||
                    error.response?.data?.message ||
                    ERRORS.SERVER_ERROR
                );
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
              <SeoComponent title="Error" />
              <ErrorBox
                errorMessage={apiError}
                link={fallBackLink}
                buttonText={fallBackAction}
              />
            </>
          ) : (
            <>
              <SeoComponent title={`Level ${params.levelId}`} />
              <div className="tablet:gap-8 tablet:p-10 desktop:p-20 flex flex-col justify-evenly tablet:justify-between tablet:items-center gap-4 p-6">
                {createClassAccordionsV2(levelId!, progress!)}
                {/* <div
                  className={`${styles.classAccordion} relative p-6 border border-lightGold w-full rounded-lg`}
                >
                  <div className="tablet:gap-10 flex items-center gap-5">
                    <p className="flex-1 font-medium text-lg">Oral Test</p>
                    <AccordionButton
                      type={getButtonTypeForScore(
                        oralTest?.time || 0,
                        oralTest?.percentage || 0
                      )}
                      text="Take Test"
                      link={`${STUDENT_ORAL_TEST}/${params.levelId}`}
                      withoutIcon
                    />
                  </div>
                </div>
                <div
                  className={`${styles.classAccordion} relative p-6 border border-lightGold w-full rounded-lg`}
                >
                  <div className="tablet:gap-10 flex items-center gap-5">
                    <p className="flex-1 font-medium text-lg">Final Test</p>
                    <AccordionButton
                      type={getButtonTypeForScore(
                        finalTest?.time || 0,
                        finalTest?.percentage || 0
                      )}
                      text="Take Test"
                      link={`${STUDENT_FINAL_TEST}/${params.levelId}`}
                      withoutIcon
                    />
                  </div>
                </div> */}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentLevelPage;
