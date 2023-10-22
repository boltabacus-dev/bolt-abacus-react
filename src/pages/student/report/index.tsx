import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isAxiosError } from 'axios';

import SeoComponent from '@components/atoms/SeoComponent';
import ErrorBox from '@components/organisms/ErrorBox';
import LoadingBox from '@components/organisms/LoadingBox';

import { useAuthStore } from '@store/authStore';
import { ReportPageParams } from '@interfaces/RouteParams';
import { ERRORS, MESSAGES } from '@constants/app';
import { LOGIN_PAGE, STUDENT_DASHBOARD } from '@constants/routes';
import { areValidReportsParams } from '@helpers/paramsValidator';
import ReportSection from '@components/sections/student/report/ReportSection';
import { reportRequest } from '@services/student';
import { ClassReport, QuizReport, TestReport } from '@interfaces/apis/student';

export interface StudentReportPageProps {}

const StudentReportPage: FC<StudentReportPageProps> = () => {
  const params = useParams<ReportPageParams>();

  const authToken = useAuthStore((state) => state.authToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallBackLink, setFallBackLink] = useState<string>(STUDENT_DASHBOARD);
  const [fallBackAction, setFallBackAction] = useState<string>(
    MESSAGES.TRY_AGAIN
  );

  const [quizReport, setQuizReport] = useState<Array<QuizReport>>();
  const [testReport, setTestReport] = useState<TestReport>();

  useEffect(() => {
    const getLevelData = async () => {
      if (isAuthenticated) {
        if (!areValidReportsParams(params.levelId!, params.classId!)) {
          setApiError(ERRORS.INVALID_REPORT);
          setFallBackLink(STUDENT_DASHBOARD);
          setFallBackAction(MESSAGES.GO_DASHBOARD);
          setLoading(false);
        } else {
          try {
            const levelId = parseInt(params.levelId!, 10);
            const classId = parseInt(params.classId!, 10);

            // TODO: API call for report details
            const res = await reportRequest(levelId, classId, authToken!);

            if (res.status === 200) {
              setApiError(null);
              const reportResponse: ClassReport = res.data;
              setTestReport(reportResponse.test);
              setQuizReport(reportResponse.quiz);
            }
          } catch (error) {
            if (isAxiosError(error)) {
              const status = error.response?.status;
              if (status === 403) {
                setApiError(error.response?.data?.error);
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
              <SeoComponent title={`Level ${params.levelId} | Report`} />
              <div className="flex flex-col gap-4 p-6 justify-evenly tablet:justify-between tablet:items-center tablet:p-10 tablet:gap-8 desktop:p-20 desktop:py-8">
                <ReportSection
                  quizReport={quizReport!}
                  testReport={testReport!}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentReportPage;
