import { FC } from 'react';

import { getScoreInteger } from '@helpers/batch';
import { StudentReport } from '@interfaces/apis/teacher';
import { PASS_MARKS } from '@constants/app';

export interface BatchReportTableProps {
  studentReports: StudentReport[];
}

const BatchReportTable: FC<BatchReportTableProps> = ({ studentReports }) => {
  return (
    <div className="flex flex-col py-1 rounded-xl bg-darkBlack border-2 border-[#636363]">
      <div className="grid grid-cols-4 gap-2 text-sm font-bold border-b border-[#636363] tablet:text-[18px] desktop:min-w-[800px]">
        <div className="p-2 text-center tablet:p-6">Name</div>
        <div className="p-2 text-center tablet:p-6">Classwork</div>
        <div className="p-2 text-center tablet:p-6">Homework</div>
        <div className="p-2 text-center tablet:p-6">Test</div>
      </div>

      {studentReports.map((report, index) => {
        const isLast = studentReports.length === index + 1;
        return (
          <div
            key={index}
            className={`grid grid-cols-4 gap-2 p-1 text-xs  ${
              isLast ? '' : 'border-b border-[#636363]'
            } tablet:text-md`}
          >
            <div className="flex items-center justify-center p-1">
              <div className="flex items-center justify-center gap-1">
                <p className="text-center capitalize">
                  {report.firstName} {report.lastName}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center p-2 text-center">
              <span
                className={`p-2 border min-w-[55px] rounded text-xs tablet:text-md tablet:min-w-[75px]  
								${
                  report.classwork >= PASS_MARKS
                    ? 'border-green bg-green/10 text-green'
                    : 'border-red bg-red/10 text-red'
                }`}
              >
                {getScoreInteger(report.classwork)}%
              </span>
            </div>
            <div className="flex items-center justify-center p-2 text-center">
              <span
                className={`p-2 border min-w-[55px] rounded text-xs tablet:text-md tablet:min-w-[75px]  
								${
                  report.homework >= PASS_MARKS
                    ? 'border-green bg-green/10 text-green'
                    : 'border-red bg-red/10 text-red'
                }`}
              >
                {getScoreInteger(report.homework)}%
              </span>
            </div>
            <div className="flex items-center justify-center p-2 text-center">
              <span
                className={`p-2 border min-w-[55px] rounded text-xs tablet:text-md tablet:min-w-[75px]  
								${
                  report.test >= PASS_MARKS
                    ? 'border-green bg-green/10 text-green'
                    : 'border-red bg-red/10 text-red'
                }`}
              >
                {getScoreInteger(report.test)}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BatchReportTable;
