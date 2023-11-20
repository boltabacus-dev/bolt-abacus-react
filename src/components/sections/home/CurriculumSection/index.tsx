import { FC } from 'react';

import Level from '@components/molecules/Level';

import { levels } from '@constants/curriculumSectionDetails';

export interface CurriculumSectionProps {}

const CurriculumSection: FC<CurriculumSectionProps> = () => {
  return (
    <div
      id="curriculum"
      className="p-12 py-5 tablet:p-10 tablet:py-6 desktop:py-8 desktop:px-24"
    >
      <h1 className="pt-2 text-xl font-bold text-center text-white desktop:text-2xl">
        Unlocking <span className="text-gold">Abacus Mastery</span>: Our
        Comprehensive <span className="text-gold">Curriculum</span>
      </h1>
      <div className="flex flex-col items-center justify-center text-left">
        <div className="pt-16">
          {levels.map((level, index) => (
            <Level
              key={index}
              title={level.title}
              points={level.points}
              lastLevel={levels.length - 1 === index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurriculumSection;
