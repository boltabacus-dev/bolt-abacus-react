import { FC, ReactNode } from 'react';

export interface InfoCardProps {
  type: 'primary' | 'secondary';
  icon: ReactNode;
  title: string;
  description: string;
}

const InfoCard: FC<InfoCardProps> = ({ type, icon, title, description }) => {
  return (
    <div
      className={`relative flex flex-col p-8 desktop:p-8 tablet:px-4 rounded-2xl
			${type === 'primary' && 'bg-coal'}
			${type === 'secondary' && 'bg-gold'}
			`}
    >
      <div
        className={`flex items-center justify-center w-14 h-14 text-xl text-black rounded-full desktop:w-16 desktop:h-16 desktop:text-2xl
				${type === 'primary' && 'bg-gold'}
				${type === 'secondary' && 'bg-white'}`}
      >
        {icon}
      </div>
      <div
        className={`${type === 'primary' && 'text-white'}
				${type === 'secondary' && 'text-black'}`}
      >
        <h1 className="py-6 text-xl font-medium desktop:py-7 desktop:text-2xl">
          {title}
        </h1>
        <p className="text-sm desktop:text-md">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
