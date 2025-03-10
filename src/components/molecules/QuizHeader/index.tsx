import ProgressBar from '@components/atoms/ProgressBar';
import { FC } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { IoMdAlarm } from 'react-icons/io';
import { GoDotFill } from 'react-icons/go';
import { getZeroPaddedNumber } from '@helpers/timer';

export interface QuizHeaderProps {
  quizType: 'homework' | 'classwork' | 'test' | 'oral-test';
  questionNumber: number;
  noOfQuestions: number;
  minutes: number;
  seconds: number;
}

const QuizHeader: FC<QuizHeaderProps> = ({
  quizType,
  questionNumber,
  noOfQuestions,
  minutes,
  seconds,
}) => {
  return (
    <div className="w-full px-1 py-4">
      <div className="flex flex-col gap-4 tablet:flex-row tablet:gap-20">
        <div className="flex gap-2 tablet:flex-col">
          <h1 className="flex-1 text-xl font-bold">
            {quizType === 'classwork'
              ? 'Classwork'
              : quizType === 'homework'
                ? 'Homework'
                : quizType === 'test'
                  ? 'Test'
                  : 'Oral Test'}
          </h1>
          <p className="flex items-center gap-1 text-lightGreen">
            <GoDotFill className="text-[10px]" />
            <span className="font-sans text-sm font-medium">Test Mode</span>
            <AiOutlineInfoCircle />
          </p>
        </div>
        <div className="flex items-center flex-1 gap-20">
          <div className="flex flex-col w-full gap-4">
            <div className="w-full font-bold tablet:text-center">
              {questionNumber + 1} of {noOfQuestions}
            </div>
            <ProgressBar
              percentage={((questionNumber + 1) / noOfQuestions) * 100}
              type="yellow"
              isBgBlack
            />
          </div>
          <p className="flex items-center gap-1">
            <IoMdAlarm className="text-xl text-gold" />
            <span className="text-md">
              {getZeroPaddedNumber(minutes)}:{getZeroPaddedNumber(seconds)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;
