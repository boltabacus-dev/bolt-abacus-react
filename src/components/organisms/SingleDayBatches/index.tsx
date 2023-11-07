import { FC } from 'react';

import BatchCard from '@components/molecules/BatchCard';

import { Days } from '@interfaces/Batch';
import { Batch } from '@interfaces/apis/teacher';
import { getBatchCardBgColor } from '@helpers/batch';

export interface SingleDayBatchesProps {
  day: Days;
  batches: Batch[];
}

const SingleDayBatches: FC<SingleDayBatchesProps> = ({ day, batches }) => {
  return (
    <div className="flex flex-col gap-4 px-4 desktop:items-center desktop:border-l desktop:border-l-grey">
      <p className="py-4 text-lg font-medium">{day}</p>
      {batches.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-1">
          {batches.map((batch, id) => {
            const color = getBatchCardBgColor();
            return (
              <BatchCard
                key={id}
                batchName={batch.batchName}
                batchId={batch.batchId}
                timings={batch.timings}
                bgColor={color}
              />
            );
          })}
        </div>
      ) : (
        <p className="p-2 text-sm font-semibold text-center text-grey">
          No Batches
        </p>
      )}
    </div>
  );
};

export default SingleDayBatches;
