import { FC } from 'react';

export interface SuccessMessageProps {
  successMessage: string;
}

const SuccessMessage: FC<SuccessMessageProps> = ({ successMessage }) => {
  return (
    <div className="flex items-center gap-1 text-green">
      <p className="text-xs tablet:text-md desktop:text-sm">{successMessage}</p>
    </div>
  );
};

export default SuccessMessage;
