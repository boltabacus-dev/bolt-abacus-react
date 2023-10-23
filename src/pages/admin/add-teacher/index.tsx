import { FC } from 'react';

import SeoComponent from '@components/atoms/SeoComponent';

export interface AdminAddTeacherPageProps {}

const AdminAddTeacherPage: FC<AdminAddTeacherPageProps> = () => {
  return (
    <>
      <SeoComponent title="Add Teacher" />
      <div className="flex flex-col gap-4 px-6 py-2 justify-evenly tablet:flex-row tablet:justify-between tablet:items-center tablet:p-10 desktop:px-24">
        AdminAddTeacherPage
      </div>
    </>
  );
};

export default AdminAddTeacherPage;
