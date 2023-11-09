import { FC } from 'react';
import styles from './index.module.css';

export interface TeacherStudentProgressSectionProps {
  studentId: number;
}

const TeacherStudentProgressSection: FC<TeacherStudentProgressSectionProps> = ({
  studentId,
}) => {
  return (
    <div
      className={`${styles.progressSection} flex flex-col gap-4 px-6 py-2 tablet:p-10 desktop:px-24`}
    >
      <div className="flex flex-col w-full gap-10 px-10">
        <p className="text-lg font-bold text-gold">Report</p>
        <div>Progress for student with id : {studentId}</div>
      </div>
    </div>
  );
};

export default TeacherStudentProgressSection;
