import { FC } from 'react';

export interface LevelProps {
  title: string;
  points: string[];
  lastLevel: boolean;
}

const Level: FC<LevelProps> = ({ title, points, lastLevel }) => {
  return (
    <div className="flex gap-6 desktop:gap-24">
      <div className="relative shrink-0 desktop:ml-10">
        <img
          src="/images/dot.png"
          alt=""
          width={100}
          height={100}
          className="w-8 h-8"
        />
        {lastLevel && (
          <div className="absolute w-8 h-full p-1 -translate-x-1/2 bg-black left-1/2 top-3 -z-10" />
        )}
      </div>
      <div className="pt-1 pb-10 pl-4 desktop:pt-0">
        <h2 className="text-lg font-normal text-gold desktop:text-xl">
          {title}
        </h2>
        <div className="pt-2">
          {points.map((point, index) => (
            <li
              key={index}
              className="py-1 ml-3 list-disc text-md tablet:ml-6 desktop:text-lg"
            >
              {point}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Level;
