import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AiFillLock, AiOutlineLink } from 'react-icons/ai';
import { MdPeople } from 'react-icons/md';

import { TEACHER_BATCH_REPORT, TEACHER_UPDATE_LINK } from '@constants/routes';

export interface BatchCardProps {
  batchName: string;
  batchId: number;
  timings: string;
  bgColor: string;
}

const BatchCard: FC<BatchCardProps> = ({
  batchId,
  batchName,
  timings,
  bgColor,
}) => {
  return (
    <div
      className={`min-h-[180px] flex flex-col justify-center gap-4 p-3 rounded-xl w-fit tablet:min-w-[170px] desktop:min-w-fit ${bgColor}`}
    >
      <p className="font-semibold text-left text-white">{batchName}</p>
      <div className="flex gap-2">
        <Link to={`${TEACHER_UPDATE_LINK}/${batchId}`}>
          <button type="button" className="p-2 text-black bg-white rounded">
            <AiOutlineLink />
          </button>
        </Link>
        <Link to={`${TEACHER_BATCH_REPORT}/${batchId}`}>
          <button type="button" className="p-2 text-black bg-white rounded">
            <MdPeople />
          </button>
        </Link>
        <button type="button" className="p-2 text-black bg-white rounded">
          <AiFillLock />
        </button>
      </div>
      <p className="pt-2 text-left text-white">{timings}</p>
    </div>
  );
};

export default BatchCard;
