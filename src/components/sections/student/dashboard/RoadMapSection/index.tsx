import { FC } from 'react';

import LevelCard from '@components/molecules/LevelCard';

export interface RoadmapSectionProps {
  currentLevel: number;
  currentClass: number;
  progress: number;
}

const RoadmapSection: FC<RoadmapSectionProps> = ({
  currentLevel,
  currentClass,
  progress,
}) => {
  const classCards = [];

  for (let i = 1; i < 11; i += 1) {
    if (currentLevel > i) {
      classCards.push(
        <LevelCard
          key={i}
          type="finished"
          description="Classes Completed"
          level={i}
        />
      );
    } else if (currentLevel === i) {
      classCards.push(
        <LevelCard
          key={i}
          type="inprogress"
          description={`Class ${currentClass}`}
          progress={progress}
          level={i}
        />
      );
    } else {
      classCards.push(
        <LevelCard key={i} type="locked" description="Class Locked" level={i} />
      );
    }
  }

  return (
    <div className="px-6 pt-2 tablet:p-10 desktop:px-24">
      <p className="font-medium text-md desktop:text-lg">Roadmap</p>
      <div className="grid grid-cols-1 gap-10 py-4 tablet:grid-cols-2 desktop:grid-cols-3">
        {classCards}
      </div>
    </div>
  );
};

export default RoadmapSection;
