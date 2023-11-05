import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import TeacherFooter from '@components/molecules/teacher/Footer';
import TeacherNavBar from '@components/molecules/teacher/NavBar';

import { useAuthStore } from '@store/authStore';
import { LOGIN_PAGE } from '@constants/routes';

export interface TeacherLayoutProps {}

const TeacherLayout: FC<TeacherLayoutProps> = () => {
  const authToken = useAuthStore((state) => state.authToken);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <>
      {(!authToken || !user || (user && user.role !== 'Teacher')) && (
        <>
          {logout()}
          <Navigate to={LOGIN_PAGE} />
        </>
      )}
      <div className="flex flex-col min-h-screen">
        <TeacherNavBar />
        <div className="flex flex-col justify-center flex-1">
          <Outlet />
        </div>
        <TeacherFooter />
      </div>
    </>
  );
};

export default TeacherLayout;
