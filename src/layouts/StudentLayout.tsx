import StudentFooter from '@components/molecules/student/Footer';
import StudentNavBar from '@components/molecules/student/NavBar';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export interface StudentLayoutProps {
  withNavBar: boolean;
  withFooter: boolean;
}

const StudentLayout: FC<StudentLayoutProps> = ({ withNavBar, withFooter }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {withNavBar && <StudentNavBar />}
      <div className="flex-1">
        <Outlet />
      </div>
      {withFooter && <StudentFooter />}
    </div>
  );
};

export default StudentLayout;
