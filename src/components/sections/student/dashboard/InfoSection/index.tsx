import { FC } from 'react';
import { Link } from 'react-router-dom';

import Button from '@components/atoms/Button';
import ProgressBar from '@components/atoms/ProgressBar';

import { STUDENT_LEVEL, STUDENT_PRACTICE } from '@constants/routes';

export interface InfoSectionProps {
  currentLevel: number;
  description: string;
  progress: number;
}

const InfoSection: FC<InfoSectionProps> = ({
  currentLevel,
  description,
  progress,
}) => {
  return (
    <div className="tablet:p-10 desktop:px-24 gap-10 grid grid-cols-1 tablet:grid-cols-2 px-6 pt-4">
      <div className="flex flex-col">
        <p className="pb-3 font-medium text-md desktop:text-lg">
          Continue Learning
        </p>
        <div className="flex flex-col bg-boxGold p-6 rounded-lg h-full">
          <p className="pb-1 font-medium desktop:text-md text-sm">
            Level - {currentLevel}
          </p>
          <p className="py-2 font-medium text-md desktop:text-lg">
            {description}
          </p>
          <ProgressBar type="green" percentage={progress} />
          <div className="pt-6">
            <Link to={`${STUDENT_LEVEL}/${currentLevel}`}>
              <Button type="primary" text="Resume Learning" />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="pb-3 font-medium text-md desktop:text-lg">
          Your Learning Playground
        </p>
        <div className="flex flex-col bg-boxPurple p-6 rounded-lg h-full">
          <p className="pb-1 font-medium desktop:text-md text-sm">
            Practice Mode
          </p>
          <p className="flex-1 py-2 font-medium text-md desktop:text-lg">
            Enhance your proficiency with well crafted practice problems
          </p>
          <div className="pt-6">
            <Link to={STUDENT_PRACTICE}>
              <Button type="purple" text="Practice Now !" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
