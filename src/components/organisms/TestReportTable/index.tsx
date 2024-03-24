import { FC } from 'react';

import { getScoreInteger } from '@helpers/batch';
import { TestReport } from '@interfaces/apis/student';

import { secondsToMinutesSeconds } from '@helpers/timer';

export interface TestReportTableProps {
  testReport: TestReport;
}

const TestReportTable: FC<TestReportTableProps> = ({ testReport }) => {
  return (
    <div className="flex flex-col gap-2 px-3 py-2 border rounded-lg bg-darkBlack border-gold tablet:px-10 desktop:px-14">
      <div className="grid grid-cols-3 gap-2 text-sm font-bold tablet:text-[18px] desktop:min-w-[800px]">
        <div className="p-2 text-center tablet:p-6">Test</div>
        <div className="p-2 font-normal text-center tablet:p-6">
          <p>
            Score:{' '}
            <span className="font-bold">
              {getScoreInteger(testReport.Test)}%
            </span>
          </p>
        </div>
        <div className="p-2 font-normal text-center tablet:p-6">
          <p>
            Time:{' '}
            <span className="font-bold">
              {secondsToMinutesSeconds(testReport.Time)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestReportTable;
