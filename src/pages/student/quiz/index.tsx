import { FC } from 'react';
import { useParams } from 'react-router-dom';

import QuizActionButton from '@components/atoms/QuizActionButton';
import QuizHeader from '@components/molecules/QuizHeader';
import QuizBox from '@components/organisms/QuizBox';

export interface StudentQuizPageProps {}

const StudentQuizPage: FC<StudentQuizPageProps> = () => {
  const params = useParams();

  // eslint-disable-next-line no-console
  console.log(params);

  return (
    <div className="min-h-[600px] flex flex-col gap-10 p-6 tablet:p-10 tablet:gap-16 desktop:px-64 desktop:py-6 desktop:gap-10">
      <QuizHeader quizType="classwork" quizProgress={30} />
      <div className="tablet:px-4">
        <QuizBox />
      </div>
      <div className="flex items-center justify-center gap-4 pt-4 tablet:gap-12">
        <QuizActionButton type="skip" text="SKIP" />
        <QuizActionButton type="next" text="NEXT" disabled />
      </div>
    </div>
  );
};

export default StudentQuizPage;
