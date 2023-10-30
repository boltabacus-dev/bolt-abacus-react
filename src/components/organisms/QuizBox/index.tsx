import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import { PiDivide } from 'react-icons/pi';
import { RxCross1, RxPlus } from 'react-icons/rx';

import { QuizQuestion } from '@interfaces/apis/student';

export interface QuizBoxProps {
  quizQuestion: QuizQuestion;
  answer: string;
  setAnswer: Dispatch<SetStateAction<string>>;
  setDisabled: Dispatch<SetStateAction<boolean>>;
}

const QuizBox: FC<QuizBoxProps> = ({
  quizQuestion,
  answer,
  setAnswer,
  setDisabled,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const result = event.target.value.replace(/[^0-9-]/gi, '');
    setAnswer(result);

    const num = parseInt(result, 10);
    if (Number.isNaN(num)) setDisabled(true);
    else setDisabled(false);
  };

  useEffect(() => {
    inputRef?.current?.focus();
  });

  return (
    <div className="w-full min-h-[300px] flex justify-center items-center p-2 py-6 bg-darkBlack shadow-boxWhite rounded-2xl">
      <div className="flex items-center w-full text-lg font-bold justify-evenly tablet:text-xl">
        <div className="flex flex-col">
          <div className="flex items-center gap-4 tablet:gap-10">
            <span>
              {quizQuestion.question.operator === '*' ? (
                <RxCross1 />
              ) : quizQuestion.question.operator === '+' ? (
                <RxPlus />
              ) : (
                <PiDivide />
              )}
            </span>
            <div className="flex flex-col items-end gap-1 tracking-widest">
              {quizQuestion.question.numbers.map((number, index) => {
                return <span key={index}>{number}</span>;
              })}
            </div>
          </div>
        </div>
        <div className="text-2xl text-gold desktop:text-3xl"> = </div>
        <div className="">
          <input
            className="w-28 px-4 py-3 bg-darkBlack outline-none border text-center border-[#A0A0A0] rounded-lg tablet:w-36"
            type="text"
            value={answer}
            ref={inputRef}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizBox;
