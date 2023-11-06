import { FC } from 'react';

import { Days } from '@interfaces/Batch';
import { Batch } from '@interfaces/apis/teacher';
import SingleDayBatches from '@components/organisms/SingleDayBatches';

export interface TeacherDashboardSectionProps {
  batches: { [key in Days]: Batch[] };
}

const TeacherDashboardSection: FC<TeacherDashboardSectionProps> = ({
  batches,
}) => {
  return (
    <div className="flex flex-col gap-4 px-6 py-2 justify-evenly tablet:flex-row tablet:justify-between tablet:items-center tablet:p-10 desktop:px-24">
      <div className="flex flex-col w-full gap-6">
        <p className="text-lg font-bold text-gold">Class Schedule</p>
        <div className="flex-1 rounded-2xl py-4 w-full border-2 border-white min-h-[300px] grid gap-2 grid-cols-1 desktop:grid-cols-7">
          <SingleDayBatches day={Days.MONDAY} batches={batches.Monday} />
          <SingleDayBatches day={Days.TUESDAY} batches={batches.Tuesday} />
          <SingleDayBatches day={Days.WEDNESDAY} batches={batches.Wednesday} />
          <SingleDayBatches day={Days.THURSDAY} batches={batches.Thursday} />
          <SingleDayBatches day={Days.FRIDAY} batches={batches.Friday} />
          <SingleDayBatches day={Days.SATURDAY} batches={batches.Saturday} />
          <SingleDayBatches day={Days.SUNDAY} batches={batches.Sunday} />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboardSection;
