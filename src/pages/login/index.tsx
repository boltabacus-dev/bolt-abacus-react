import { FC } from 'react';

import SeoComponent from '@components/atoms/SeoComponent';
import HeroImage from '@components/molecules/HeroImage';
import LoginForm from '@components/organisms/LoginForm';

import styles from './index.module.css';

export interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
  return (
    <>
      <SeoComponent title="Login" href="login" />
      <div
        className={`${styles.formSection} flex items-center justify-center px-2 desktop:pt-3`}
      >
        <div className="desktop:ml-6 tablet:h-full desktop:w-[30%] desktop:px-20 desktop:pt-12 tablet:flex tablet:items-center">
          <LoginForm />
        </div>
        <div className="hidden pl-10 pt-10 items-center justify-center tablet:hidden desktop:w-[70%] desktop:flex">
          <HeroImage />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
