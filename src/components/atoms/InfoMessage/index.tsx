import { FC } from 'react';

export interface InfoMessageProps {
  infoMessage: string;
}

const InfoMessage: FC<InfoMessageProps> = ({ infoMessage }) => {
  return (
    <div className="flex items-center gap-1 text-gold">
      <p className="text-xs tablet:text-md desktop:text-sm font-bold">
        {infoMessage}
      </p>
    </div>
  );
};

export default InfoMessage;
