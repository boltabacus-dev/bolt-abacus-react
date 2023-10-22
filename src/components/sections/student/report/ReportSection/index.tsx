import QuizReportTable from '@components/organisms/QuizReportTable';
import TestReportTable from '@components/organisms/TestReportTable';
import { ReportPageParams } from '@interfaces/RouteParams';
import { QuizReport, TestReport } from '@interfaces/apis/student';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

export interface ReportSectionProps {
  quizReport: Array<QuizReport>;
  testReport: TestReport;
}

const ReportSection: FC<ReportSectionProps> = ({ quizReport, testReport }) => {
  const params = useParams<ReportPageParams>();
  return (
    <div className="flex flex-col gap-2 px-3 py-2 tablet:px-10 tablet:gap-6 desktop:px-16">
      <p className="font-bold text-gold tablet:text-xl">Report</p>
      <div className="flex gap-8">
        <p className="text-[#B1B1B1] text-md">
          Level: <span className="font-bold text-white">{params.levelId}</span>
        </p>
        <p className="text-[#B1B1B1] text-md">
          Class: <span className="font-bold text-white">{params.classId}</span>
        </p>
      </div>
      <QuizReportTable quizReport={quizReport} />
      <TestReportTable testReport={testReport} />
    </div>
  );
};

export default ReportSection;
