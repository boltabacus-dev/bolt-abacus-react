import { FC } from 'react';

import { IoMdAlarm } from 'react-icons/io';
import { GoDotFill } from 'react-icons/go';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import ProgressBar from '@components/atoms/ProgressBar';

import { getZeroPaddedNumber } from '@helpers/timer';

export interface PracticeHeaderProps {
  practiceType: 'timed' | 'untimed' | 'flashcards' | 'set';
  questionNumber: number;
  noOfQuestions: number;
  minutes: number;
  seconds: number;
  showProgressBar?: boolean;
}

const PracticeHeader: FC<PracticeHeaderProps> = ({
  practiceType,
  questionNumber,
  noOfQuestions,
  minutes,
  seconds,
  showProgressBar = true,
}) => {
  return (
    <div className="px-1 py-4 w-full">
      <div className="tablet:gap-20 flex tablet:flex-row flex-col gap-4">
        <div className="flex tablet:flex-col gap-2">
          <h1 className="flex-1 font-bold text-xl">
            {practiceType === 'timed'
              ? 'Question Countdown'
              : practiceType === 'untimed'
                ? 'No Rush Mastery'
                : practiceType === 'flashcards'
                  ? 'Flash Cards'
                  : 'Set Practice'}
          </h1>
          <p className="flex items-center gap-1 text-lightGreen">
            <GoDotFill className="text-[10px]" />
            <span className="font-sans font-medium text-sm">Practice Mode</span>
            <AiOutlineInfoCircle />
          </p>
        </div>
        <div className="flex flex-1 items-center gap-20">
          {showProgressBar && (
            <div className="flex flex-col gap-4 w-full">
              <div className="w-full font-bold tablet:text-center">
                {questionNumber + 1} of {noOfQuestions}
              </div>
              <ProgressBar
                percentage={((questionNumber + 1) / noOfQuestions) * 100}
                type="yellow"
                isBgBlack
              />
            </div>
          )}
          <p className="flex items-center gap-1 ml-auto">
            <IoMdAlarm className="text-gold text-xl" />
            <span className="text-md">
              {getZeroPaddedNumber(minutes)}:{getZeroPaddedNumber(seconds)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PracticeHeader;
