import { FC } from 'react';

import SeoComponent from '@components/atoms/SeoComponent';

export interface SubAdminDashboardPageProps {}

const SubAdminDashboardPage: FC<SubAdminDashboardPageProps> = () => {
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
        </div>
      </div>
    </>
  );
};

export default SubAdminDashboardPage;
