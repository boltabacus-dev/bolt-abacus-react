import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';

import Breadcrumbs from '@components/atoms/Breadcrumbs';
import QuizResultTable from '@components/organisms/QuizResultTable';

import { QuizPageParams } from '@interfaces/RouteParams';
import { QuestionResult } from '@interfaces/apis/student';
import QuizActionButton from '@components/atoms/QuizActionButton';
import { MESSAGES } from '@constants/app';
import { STUDENT_LEVEL } from '@constants/routes';
import { secondsToMinutesSeconds } from '@helpers/timer';

export interface ResultSectionProps {
  levelId: number;
  result: Array<QuestionResult>;
  verdict: boolean;
  time: number;
}

const ResultSection: FC<ResultSectionProps> = ({
  levelId,
  result,
  verdict,
  time,
}) => {
  const params = useParams<QuizPageParams>();
  const links =
    params.topicId === undefined
      ? [`Level ${params.levelId}`, `Class ${params.classId}`]
      : [
          `Level ${params.levelId}`,
          `Class ${params.classId}`,
          `Topic ${params.topicId}`,
        ];

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs links={links} />
      <div className="p-2 flex flex-col gap-4">
        <div className="flex justify-center items-center text-bold text-lg font-semibold">
          {verdict ? (
            <span className="text-green">{MESSAGES.QUIZ_PASS}</span>
          ) : (
            <span className="text-red">{MESSAGES.QUIZ_FAIL}</span>
          )}
        </div>
        <div className="flex gap-2 justify-between">
          <p className="font-bold text-gold tablet:text-xl">
            {params.quizType === 'classwork'
              ? 'Classwork'
              : params.quizType === 'homework'
                ? 'Homework'
                : 'Test'}
          </p>
          <p className="font-bold text-sm tablet:text-md">
            Time Taken: {secondsToMinutesSeconds(time)}
          </p>
        </div>
        <QuizResultTable result={result} />
        <div className="py-2 flex items-center gap-5 justify-center tablet:py-2">
          <Link to={window.location.pathname} reloadDocument>
            <QuizActionButton
              text={verdict ? 'Retake Test' : 'Retry Test'}
              type="next"
            />
          </Link>
          <Link to={`${STUDENT_LEVEL}/${levelId}`}>
            <QuizActionButton text={MESSAGES.GO_DASHBOARD} type="next" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultSection;
