import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidEdit } from 'react-icons/bi';

import { QuizQuestion } from '@interfaces/apis/admin';
import { ADMIN_EDIT_QUESTION } from '@constants/routes';

export interface QuizQuestionsTableProps {
  questions: Array<QuizQuestion>;
}

const QuizQuestionsTable: FC<QuizQuestionsTableProps> = ({ questions }) => {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-gold font-bold text-lg">Quiz Questions </p>
      <div className="py-2 px-3 bg-darkBlack rounded-lg border border-gold flex flex-col gap-2 tablet:px-10 desktop:px-14">
        <div className="grid grid-cols-4 gap-2 text-sm font-bold border-b border-[#636363] tablet:text-[18px]">
          <div className="text-center p-2 tablet:p-6">Numbers</div>
          <div className="text-center p-2 tablet:p-6">Operator</div>
          <div className="text-center p-2 tablet:p-6">Correct Answer</div>
          <div className="text-center p-2 tablet:p-6">Actions</div>
        </div>
        {questions.map((question, index) => {
          const isLast = questions.length === index + 1;
          return (
            <div
              key={index}
              className={`grid grid-cols-4 gap-2 text-xs border-b border-[#636363] ${
                isLast && 'mb-4'
              } tablet:text-md`}
            >
              <div className="flex justify-center items-center p-3 tablet:p-4 desktop:p-3">
                <p>
                  {question.question.numbers.map((number, i) => {
                    return (
                      <span key={i}>
                        {i + 1 === question.question.numbers.length ? (
                          <span>{number}</span>
                        ) : (
                          <span>{`${number},  `}</span>
                        )}
                      </span>
                    );
                  })}
                </p>
              </div>
              <div className="flex justify-center items-center p-3 break-all text-center tablet:p-4 desktop:p-3">
                {question.question.operator === '+'
                  ? 'Addition'
                  : question.question.operator === '/'
                  ? 'Division'
                  : 'Multiplication'}
              </div>
              <div className="flex justify-center items-center p-3 tablet:p-4 desktop:p-3">
                {question.correctAnswer}
              </div>
              <div className="flex justify-center items-center p-3 tablet:p-4 desktop:p-3">
                <button
                  type="button"
                  className="px-3 py-2 font-semibold text-center rounded-lg text-md duration-150 ease-in-out bg-gold/80 text-black hover:bg-gold flex items-center justify-center"
                >
                  <Link to={`${ADMIN_EDIT_QUESTION}/${question.questionId}`}>
                    <BiSolidEdit />
                  </Link>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizQuestionsTable;
