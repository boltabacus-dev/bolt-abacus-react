import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export interface DefaultLayoutProps {}

const DefaultLayout: FC<DefaultLayoutProps> = () => {
  return (
    <div className="font-gilroy bg-black text-white text-md">
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
