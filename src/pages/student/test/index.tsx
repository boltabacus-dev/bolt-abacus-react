import SeoComponent from '@components/atoms/SeoComponent';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

export interface StudentTestPageProps {}

const StudentTestPage: FC<StudentTestPageProps> = () => {
  const params = useParams();
  return (
    <>
      <SeoComponent title="Test" />
      <div>
        Student Test Page with
        <br />
        levelId: {params.levelId}
        <br />
        classId: {params.classId}
        <br />
        topicId: {params.topicId}
        <br />
      </div>
    </>
  );
};

export default StudentTestPage;
