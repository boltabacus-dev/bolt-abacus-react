import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';

import Breadcrumbs from '@components/atoms/Breadcrumbs';
import QuizResultTable from '@components/organisms/QuizResultTable';

import { QuizPageParams } from '@interfaces/RouteParams';
import { QuestionResult } from '@interfaces/apis/student';
import QuizActionButton from '@components/atoms/QuizActionButton';
import { MESSAGES } from '@constants/app';
import { STUDENT_DASHBOARD } from '@constants/routes';

export interface ResultSectionProps {
  result: Array<QuestionResult>;
  verdict: boolean;
}

const ResultSection: FC<ResultSectionProps> = ({ result, verdict }) => {
  const params = useParams<QuizPageParams>();

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        links={[
          `Level ${params.levelId}`,
          `Class ${params.classId}`,
          `Topic ${params.topicId}`,
        ]}
      />
      <div className="p-2 flex flex-col gap-4">
        <div className="flex justify-center items-center text-bold text-lg font-semibold">
          {verdict ? (
            <span className="text-green">{MESSAGES.QUIZ_PASS}</span>
          ) : (
            <span className="text-red">{MESSAGES.QUIZ_FAIL}</span>
          )}
        </div>
        <div className="flex gap-2 justify-between">
          <p className="font-bold text-gold tablet:text-lg">
            {params.quizType === 'classwork' ? 'Classwork' : 'Homework'}
          </p>
          <p className="font-bold text-sm tablet:text-md">Time Taken: 10:12</p>
        </div>
        <QuizResultTable result={result} />
        <div className="py-2 flex items-center gap-5 justify-center tablet:py-2">
          <Link to={window.location.pathname} reloadDocument>
            <QuizActionButton
              text={verdict ? 'Retake Test' : 'Retry Test'}
              type="next"
            />
          </Link>
          <Link to={STUDENT_DASHBOARD}>
            <QuizActionButton text={MESSAGES.GO_DASHBOARD} type="next" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultSection;
