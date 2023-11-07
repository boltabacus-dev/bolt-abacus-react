import { FC } from 'react';

export interface BatchReportSectionProps {
  batchId: number;
}

const BatchReportSection: FC<BatchReportSectionProps> = ({ batchId }) => {
  return (
    <div className="flex flex-col gap-4 px-6 py-2 justify-evenly tablet:flex-row tablet:justify-between tablet:items-center tablet:p-10 desktop:px-24">
      <div className="flex flex-col w-full gap-10">
        <p className="text-xl font-bold text-gold">Batch Report of {batchId}</p>
      </div>
    </div>
  );
};

export default BatchReportSection;
