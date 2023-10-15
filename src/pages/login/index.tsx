import SeoComponent from '@components/atoms/SeoComponent';
import { FC } from 'react';

export interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
  return (
    <>
      <SeoComponent title="Login" href="login" />
      <div>
        <p>Login Page</p>
      </div>
    </>
  );
};

export default LoginPage;
