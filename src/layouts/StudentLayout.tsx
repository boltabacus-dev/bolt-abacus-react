import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import StudentFooter from '@components/molecules/student/Footer';
import StudentNavBar from '@components/molecules/student/NavBar';

import { useAuthStore } from '@store/authStore';
import { LOGIN_PAGE } from '@constants/routes';

export interface StudentLayoutProps {
  withNavBar: boolean;
  withFooter: boolean;
}

const StudentLayout: FC<StudentLayoutProps> = ({ withNavBar, withFooter }) => {
  const authToken = useAuthStore((state) => state.authToken);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <>
      {(!authToken || !user || (user && user.role !== 'student')) && (
        <>
          {logout()}
          <Navigate to={LOGIN_PAGE} />
        </>
      )}
      <div className="flex flex-col min-h-screen">
        {withNavBar && <StudentNavBar />}
        <div className="flex-1 flex flex-col justify-center">
          <Outlet />
        </div>
        {withFooter && <StudentFooter />}
      </div>
    </>
  );
};

export default StudentLayout;
