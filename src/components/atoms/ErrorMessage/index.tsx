import { FC } from 'react';
import { IoAlertCircleOutline } from 'react-icons/io5';

export interface ErrorMessageProps {
  errMessage: string;
  iconRequired: boolean;
}

const errorMessage: FC<ErrorMessageProps> = ({ errMessage, iconRequired }) => {
  return (
    <div className="flex items-center gap-1 text-red">
      {iconRequired && <IoAlertCircleOutline size={18} />}
      <p className="text-xs tablet:text-md desktop:text-sm">{errMessage}</p>
    </div>
  );
};

export default errorMessage;
