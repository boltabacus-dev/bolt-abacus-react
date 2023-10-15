import { FC } from 'react';
import { useParams } from 'react-router-dom';

export interface StudentLevelPageProps {}

const StudentLevelPage: FC<StudentLevelPageProps> = () => {
  const params = useParams();
  return <div>Student Level Page with levelId: {params.levelId}</div>;
};

export default StudentLevelPage;
