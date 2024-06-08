import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import AdminNavBar from '@components/molecules/admin/NavBar';
import AdminFooter from '@components/molecules/admin/Footer';
import AdminLinkBar from '@components/molecules/admin/LinkBar';

import { validAuthToken } from '@helpers/auth';
import { useAuthStore } from '@store/authStore';
import { LOGIN_PAGE } from '@constants/routes';

export interface AdminLayoutProps {
  withLinkBar: boolean;
}

const AdminLayout: FC<AdminLayoutProps> = ({ withLinkBar = true }) => {
  const authToken = useAuthStore((state) => state.authToken);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <>
      {(!authToken ||
        !user ||
        (user && user.role !== 'Admin') ||
        !validAuthToken(authToken!)) && (
        <>
          {logout()}
          <Navigate to={LOGIN_PAGE} />
        </>
      )}
      <div className="flex flex-col min-h-screen">
        <AdminNavBar />
        <div className="flex justify-center flex-1">
          {withLinkBar && <AdminLinkBar />}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
        <AdminFooter />
      </div>
    </>
  );
};

export default AdminLayout;
