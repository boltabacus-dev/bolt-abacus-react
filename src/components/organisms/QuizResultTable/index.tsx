import { FC } from 'react';

import { QuestionResult } from '@interfaces/apis/student';
import { TiTick } from 'react-icons/ti';
import { MdDangerous } from 'react-icons/md';

export interface QuizResultTableProps {
  result: Array<QuestionResult>;
}

const QuizResultTable: FC<QuizResultTableProps> = ({ result }) => {
  return (
    <div className="tablet:px-10 desktop:px-14 flex flex-col gap-2 bg-darkBlack px-3 py-2 border border-gold rounded-lg">
      <div className="tablet:text-[18px] gap-2 grid grid-cols-3 border-[#636363] border-b font-bold text-sm">
        <div className="tablet:p-6 p-2 text-center">Verdict</div>
        <div className="tablet:p-6 p-2 text-center">Question</div>
        <div className="tablet:p-6 p-2 text-center">Your Answer</div>
      </div>
      {result.map((question, index) => {
        const isLast = result.length === index + 1;
        return (
          <div
            key={index}
            className={`grid grid-cols-3 gap-2 text-xs border-b border-[#636363] ${
              isLast && 'mb-4'
            } tablet:text-md`}
          >
            <div className="tablet:p-4 desktop:p-3 flex justify-center items-center p-3">
              {question.verdict ? (
                <div className="flex justify-center items-center gap-1">
                  <span>Correct</span>
                  <TiTick className="bg-green rounded-full text-black text-sm" />
                </div>
              ) : (
                <div className="flex justify-center items-center gap-1">
                  <span>Wrong</span>
                  <MdDangerous className="bg-red rounded-full text-black text-md" />
                </div>
              )}
            </div>
            <div className="tablet:p-4 desktop:p-3 flex justify-center items-center p-3 text-center break-all">
              {question.question}
            </div>
            <div className="tablet:p-4 desktop:p-3 flex justify-center items-center p-3 text-center break-all text-wrap">
              {question.answer !== null
                ? BigInt(question.answer).toString()
                : '-'}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizResultTable;
