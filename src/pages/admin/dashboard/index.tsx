import { FC } from 'react';
import { Link } from 'react-router-dom';

import SeoComponent from '@components/atoms/SeoComponent';

import {
  ADMIN_ADD_BATCH,
  ADMIN_ADD_ORGANIZATION,
  ADMIN_ADD_QUESTION,
  ADMIN_ADD_STUDENT,
  ADMIN_ADD_TEACHER,
  ADMIN_BULK_ADD_QUESTION,
  ADMIN_VIEW_QUIZ,
} from '@constants/routes';

export interface AdminDashboardPageProps {}

const AdminDashboardPage: FC<AdminDashboardPageProps> = () => {
  return (
    <>
      <SeoComponent title="Dashboard" />
      <div className="flex flex-col gap-4 px-6 py-2 justify-evenly tablet:flex-row tablet:justify-between tablet:items-center tablet:p-10 desktop:px-24">
        <p className="hidden mt-32 text-lg font-bold text-gold tablet:block">
          Please use the links on the left to perform desired operations
        </p>
        <div className="flex flex-col w-full gap-4 font-bold tablet:hidden">
          <div className="text-lg text-gold">
            Please use the below links to perform desired operations
          </div>
          <Link to={ADMIN_ADD_STUDENT}>Add Student</Link>
          <Link to={ADMIN_ADD_TEACHER}>Add Teacher</Link>
          <Link to={ADMIN_ADD_BATCH}>Add Batch</Link>
          <Link to={ADMIN_VIEW_QUIZ}>View Quiz</Link>
          <Link to={ADMIN_ADD_QUESTION}>Add Question</Link>
          <Link to={ADMIN_BULK_ADD_QUESTION}>Bulk Add Question</Link>
          <Link to={ADMIN_ADD_ORGANIZATION}>Add Organization</Link>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
