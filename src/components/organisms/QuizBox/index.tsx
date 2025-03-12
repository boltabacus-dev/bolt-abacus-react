import {
  ChangeEvent,
  KeyboardEvent,
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
  submitAnswer: () => void;
}

const QuizBox: FC<QuizBoxProps> = ({
  quizQuestion,
  answer,
  setAnswer,
  setDisabled,
  submitAnswer,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const result = event.target.value.replace(/[^0-9-.]/gi, '');
    setAnswer(result);

    const num = parseInt(result, 10);
    if (Number.isNaN(num)) setDisabled(true);
    else setDisabled(false);
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      submitAnswer();
    }
  };

  useEffect(() => {
    inputRef?.current?.focus();
  });

  return (
    <div className="flex justify-center items-center bg-darkBlack shadow-boxWhite p-2 py-6 rounded-2xl w-full min-h-[300px]">
      <div className="flex justify-evenly items-center gap-4 w-full overflow-auto font-bold text-lg tablet:text-xl">
        <div className="flex flex-col">
          <div className="tablet:gap-10 flex items-center gap-4">
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
                const fullNumber = BigInt(number);
                return <span key={index}>{fullNumber.toString()}</span>;
              })}
            </div>
          </div>
        </div>
        <div className="text-gold text-2xl desktop:text-3xl"> = </div>
        <div className="">
          <input
            className="tablet:w-32 bg-darkBlack px-4 py-3 border border-[#A0A0A0] rounded-lg outline-none w-20 text-center"
            type="text"
            inputMode="decimal"
            value={answer}
            ref={inputRef}
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => handleEnter(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizBox;
