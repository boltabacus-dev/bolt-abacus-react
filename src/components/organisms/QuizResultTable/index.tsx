import { FC } from 'react';

import { QuestionResult } from '@interfaces/apis/student';
import { TiTick } from 'react-icons/ti';
import { MdDangerous } from 'react-icons/md';

export interface QuizResultTableProps {
  result: Array<QuestionResult>;
}

const QuizResultTable: FC<QuizResultTableProps> = ({ result }) => {
  return (
    <div className="py-2 px-3 bg-darkBlack rounded-lg border border-gold flex flex-col gap-2 tablet:px-10 desktop:px-14">
      <div className="grid grid-cols-3 gap-2 text-sm font-bold border-b border-[#636363] tablet:text-[18px]">
        <div className="text-center p-2 tablet:p-6">Verdict</div>
        <div className="text-center p-2 tablet:p-6">Question</div>
        <div className="text-center p-2 tablet:p-6">Your Answer</div>
      </div>
      {result.map((question, index) => {
        const isLast = result.length === index + 1;
        return (
          <div
            key={question.question}
            className={`grid grid-cols-3 gap-2 text-xs border-b border-[#636363] ${
              isLast && 'mb-4'
            } tablet:text-md`}
          >
            <div className="flex justify-center items-center p-3 tablet:p-4 desktop:p-3">
              {question.verdict ? (
                <div className="flex justify-center items-center gap-1">
                  <span>Correct</span>
                  <TiTick className="rounded-full bg-green text-black text-sm" />
                </div>
              ) : (
                <div className="flex justify-center items-center gap-1">
                  <span>Wrong</span>
                  <MdDangerous className="rounded-full bg-red text-black text-md" />
                </div>
              )}
            </div>
            <div className="flex justify-center items-center p-3 break-all text-center tablet:p-4 desktop:p-3">
              {question.question}
            </div>
            <div className="flex justify-center items-center p-3 tablet:p-4 desktop:p-3">
              {question.answer ? question.answer : '-'}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizResultTable;
