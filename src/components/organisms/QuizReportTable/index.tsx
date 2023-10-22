import { QuizReport } from '@interfaces/apis/student';
import { FC } from 'react';

export interface QuizReportTableProps {
  quizReport: Array<QuizReport>;
}

const QuizReportTable: FC<QuizReportTableProps> = ({ quizReport }) => {
  return (
    <div className="flex flex-col gap-2 px-3 py-2 border rounded-lg bg-darkBlack border-gold tablet:px-10 desktop:px-14">
      <div className="grid grid-cols-3 gap-2 text-sm font-bold border-b border-[#636363] tablet:text-[18px] tablet:min-w-[800px]">
        <div className="p-2 text-center tablet:p-6" />
        <div className="p-2 text-center tablet:p-6">Classwork</div>
        <div className="p-2 text-center tablet:p-6">Homework</div>
      </div>
      {quizReport.map((topic, index) => {
        const isLast = quizReport.length === index + 1;
        return (
          <div
            key={topic.topicId}
            className={`grid grid-cols-3 gap-2 text-xs border-b border-[#636363] ${
              isLast && 'mb-4'
            } tablet:text-md`}
          >
            <div className="flex items-center justify-center p-3 tablet:p-4 desktop:p-3">
              <div className="flex items-center justify-center gap-1">
                <p>Topic {topic.topicId}</p>
              </div>
            </div>
            <div className="flex items-center justify-center p-3 text-center break-all tablet:p-4 desktop:p-3">
              {topic.Classwork > 0 ? (
                <span>{topic.Classwork}%</span>
              ) : (
                <span> - </span>
              )}
            </div>
            <div className="flex items-center justify-center p-3 tablet:p-4 desktop:p-3">
              {topic.Homework > 0 ? (
                <span>{topic.Homework}%</span>
              ) : (
                <span> - </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizReportTable;
