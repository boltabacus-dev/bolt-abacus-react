import { FC } from 'react';

export interface AdminDashboardPageProps {}

const AdminDashboardPage: FC<AdminDashboardPageProps> = () => {
  return (
    <div className="flex flex-col gap-4 px-6 py-2 justify-evenly tablet:flex-row tablet:justify-between tablet:items-center tablet:p-10 desktop:px-24">
      AdminDashboardPage
    </div>
  );
};

export default AdminDashboardPage;
