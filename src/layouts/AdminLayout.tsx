import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import AdminNavBar from '@components/molecules/admin/NavBar';
import AdminFooter from '@components/molecules/admin/Footer';

import { useAuthStore } from '@store/authStore';
import { LOGIN_PAGE } from '@constants/routes';

export interface AdminLayoutProps {}

const AdminLayout: FC<AdminLayoutProps> = () => {
  const authToken = useAuthStore((state) => state.authToken);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <>
      {(!authToken || !user || (user && user.role !== 'admin')) && (
        <>
          {logout()}
          <Navigate to={LOGIN_PAGE} />
        </>
      )}
      <div className="flex flex-col min-h-screen">
        <AdminNavBar />
        <div className="flex-1 flex flex-col justify-center">
          <Outlet />
        </div>
        <AdminFooter />
      </div>
    </>
  );
};

export default AdminLayout;
