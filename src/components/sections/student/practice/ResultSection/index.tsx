import { FC } from 'react';
import { Link } from 'react-router-dom';

import QuizResultTable from '@components/organisms/QuizResultTable';
import QuizActionButton from '@components/atoms/QuizActionButton';

import { secondsToMinutesSeconds } from '@helpers/timer';
import { QuestionResult } from '@interfaces/apis/student';

import { MESSAGES } from '@constants/app';
import { STUDENT_DASHBOARD } from '@constants/routes';

export interface ResultSectionProps {
  result: Array<QuestionResult>;
  time: number;
  averageTime: number;
  totalScore: string;
  practiceType: 'timed' | 'untimed' | 'flashcards' | 'set';
}

const ResultSection: FC<ResultSectionProps> = ({
  result,
  time,
  averageTime,
  totalScore,
  practiceType,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 p-2">
        <div className="flex justify-between gap-2">
          <p className="font-bold text-gold tablet:text-xl">
            {practiceType === 'timed'
              ? 'Question Countdown'
              : practiceType === 'untimed'
              ? 'No Rush Mastery'
              : practiceType === 'flashcards'
              ? 'Flash Cards'
              : 'Set Practice'}
          </p>
        </div>
        <div className="flex flex-col gap-2 py-2">
          <p className="tablet:text-md font-bold text-sm">
            Total Score: {totalScore}
          </p>
          <p className="tablet:text-md font-bold text-sm">
            Total Time Taken: {secondsToMinutesSeconds(time)}
          </p>
          <p className="tablet:text-md font-bold text-sm">
            Time Taken per Question: {averageTime} second
          </p>
        </div>
        <QuizResultTable result={result} />
        <div className="tablet:py-2 flex justify-center items-center gap-5 py-2">
          <Link to={window.location.pathname} reloadDocument>
            <QuizActionButton text="Retake Practice" type="next" />
          </Link>
          <Link to={`${STUDENT_DASHBOARD}`}>
            <QuizActionButton text={MESSAGES.GO_DASHBOARD} type="next" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultSection;
