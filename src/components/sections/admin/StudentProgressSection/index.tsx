import { FC } from 'react';

import { LevelProgress } from '@interfaces/apis/teacher';

import LevelProgressAccordion from '@components/organisms/LevelProgressAccordion';

import styles from './index.module.css';

export interface AdminStudentProgressSectionProps {
  studentName: string;
  batchName: string;
  progress: LevelProgress[];
}

const AdminStudentProgressSection: FC<AdminStudentProgressSectionProps> = ({
  studentName,
  batchName,
  progress,
}) => {
  return (
    <div
      className={`${styles.progressSection} flex flex-col gap-4 p-6 tablet:p-10 desktop:px-24`}
    >
      <div className="flex flex-col w-full gap-8 px-1 tablet:px-10">
        <p className="text-xl font-bold text-gold">Report</p>
        <div className="flex flex-col gap-4 tablet:flex-row tablet:gap-10">
          <p className="font-bold text-md">
            <span className="font-medium text-grey">Student Name: </span>
            {studentName}
          </p>
          <p className="font-bold text-md">
            <span className="font-medium text-grey">Batch: </span>
            {batchName}
          </p>
        </div>
        <div className="flex flex-col gap-10">
          {progress.map((levelProgress, index) => {
            return (
              <div key={index} className="h-fit">
                <LevelProgressAccordion levelProgress={levelProgress} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminStudentProgressSection;
