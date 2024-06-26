import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import SubAdminNavBar from '@components/molecules/sub-admin/NavBar';
import SubAdminFooter from '@components/molecules/sub-admin/Footer';
import SubAdminLinkBar from '@components/molecules/sub-admin/LinkBar';

import { validAuthToken } from '@helpers/auth';
import { useAuthStore } from '@store/authStore';
import { LOGIN_PAGE } from '@constants/routes';

export interface SubAdminLayoutProps {
  withLinkBar: boolean;
}

const SubAdminLayout: FC<SubAdminLayoutProps> = ({ withLinkBar = true }) => {
  const authToken = useAuthStore((state) => state.authToken);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <>
      {(!authToken ||
        !user ||
        (user && user.role !== 'SubAdmin') ||
        !validAuthToken(authToken!)) && (
        <>
          {logout()}
          <Navigate to={LOGIN_PAGE} />
        </>
      )}
      <div className="flex flex-col min-h-screen">
        <SubAdminNavBar />
        <div className="flex justify-center flex-1">
          {withLinkBar && <SubAdminLinkBar />}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
        <SubAdminFooter />
      </div>
    </>
  );
};

export default SubAdminLayout;
