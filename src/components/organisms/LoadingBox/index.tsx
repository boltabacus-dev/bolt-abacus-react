import { FC } from 'react';

export interface LoadingSectionProps {
  loadingText?: string;
}

const LoadingSection: FC<LoadingSectionProps> = ({
  loadingText = 'Loading...',
}) => {
  return (
    <div className="h-56 flex justify-center flex-col gap-4 items-center">
      <img src="/icon.png" alt="loading" height={100} width={100} />
      <h1 className="text-lg font-medium text-center font-sans">
        {loadingText}
      </h1>
    </div>
  );
};

export default LoadingSection;
