import Button from '@components/atoms/Button';
import { FC } from 'react';

export interface ErrorSectionProps {
  errorMessage: string;
  onClick: () => void;
  buttonText: string;
}

const ErrorSection: FC<ErrorSectionProps> = ({
  errorMessage,
  onClick,
  buttonText,
}) => {
  return (
    <div className="p-12 flex justify-center flex-col gap-6 items-center">
      <img src="/icon.png" alt="loading" height={100} width={100} />
      <h1 className="text-lg font-medium font-sans">{errorMessage}</h1>
      <div
        role="button"
        className="min-w-[150px]"
        onClick={onClick}
        onKeyDown={onClick}
        tabIndex={0}
      >
        <Button type="primary" text={buttonText} />
      </div>
    </div>
  );
};

export default ErrorSection;
