import { FC } from 'react';
import { useParams } from 'react-router-dom';

export interface StudentQuizPageProps {}

const StudentQuizPage: FC<StudentQuizPageProps> = () => {
  const params = useParams();
  return (
    <div>
      Student Quiz Page with
      <br />
      levelId: {params.levelId}
      <br />
      classId: {params.classId}
      <br />
      topicId: {params.topicId}
      <br />
      quizType: {params.quizType}
    </div>
  );
};

export default StudentQuizPage;
