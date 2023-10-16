import { FC } from 'react';
import { Link } from 'react-router-dom';

import Button from '@components/atoms/Button';

export interface ErrorBoxProps {
  errorMessage: string;
  link: string;
  buttonText: string;
}

const ErrorBox: FC<ErrorBoxProps> = ({ errorMessage, link, buttonText }) => {
  return (
    <div className="p-12 mt-10 flex justify-center flex-col gap-6 items-center">
      <img src="/icon.png" alt="loading" height={100} width={100} />
      <h1 className="text-lg font-medium font-sans">{errorMessage}</h1>
      <div className="min-w-[150px]">
        <Link to={link}>
          <Button type="primary" text={buttonText} />
        </Link>
      </div>
    </div>
  );
};

export default ErrorBox;
