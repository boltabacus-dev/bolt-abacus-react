import { FC } from 'react';
import Button from '@components/atoms/Button';
import { Link } from 'react-router-dom';

export interface Custom404PageProps {
  link: string;
  buttonText: string;
}

const Custom404Page: FC<Custom404PageProps> = ({ link, buttonText }) => {
  return (
    <main className="h-screen flex justify-around items-center flex-col">
      <div className="text-center">
        <h1 className="text-xxl gap-4 font-bold flex items-center">
          <span>4</span>
          <span>
            <img src="/icon.png" alt="Icon" height={100} width={100} />
          </span>
          <span>4</span>
        </h1>
        <h1 className="text-lg font-bold p-4">Page Not Found</h1>
        <Link to={link}>
          <Button type="primary" text={buttonText} />
        </Link>
      </div>
    </main>
  );
};

export default Custom404Page;
