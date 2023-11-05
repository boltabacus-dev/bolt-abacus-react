import { FC } from 'react';

export interface TeacherUpdateLinkSectionProps {
  batchId: number;
}

const TeacherUpdateLinkSection: FC<TeacherUpdateLinkSectionProps> = ({
  batchId,
}) => {
  return (
    <div className="flex flex-col gap-4 px-6 py-2 justify-evenly tablet:flex-row tablet:justify-between tablet:items-center tablet:p-10 desktop:px-24">
      <p>Teacher Update Link Section with batch id : {batchId}</p>
    </div>
  );
};

export default TeacherUpdateLinkSection;
