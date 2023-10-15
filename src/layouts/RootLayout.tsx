import Footer from '@components/molecules/Footer';
import NavBar from '@components/molecules/NavBar';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export interface RootLayoutProps {
  withNavBar: boolean;
  withFooter: boolean;
}

const RootLayout: FC<RootLayoutProps> = ({ withNavBar, withFooter }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {withNavBar && <NavBar />}
      <div className="flex-1">
        <Outlet />
      </div>
      {withFooter && <Footer />}
    </div>
  );
};

export default RootLayout;
