import { FC } from 'react';

export interface AdminViewQuizPageProps {}

const AdminViewQuizPage: FC<AdminViewQuizPageProps> = () => {
  return (
    <div className="flex flex-col gap-4 px-6 py-2 justify-evenly tablet:flex-row tablet:justify-between tablet:items-center tablet:p-10 desktop:px-24">
      AdminViewQuizPage
    </div>
  );
};

export default AdminViewQuizPage;
