import { FC } from 'react';
import { MdTimer } from 'react-icons/md';
import { BiSolidReport } from 'react-icons/bi';

import { getScoreInteger } from '@helpers/batch';
import { secondsToMinutesSeconds } from '@helpers/timer';

import { getClassNamesForScore } from '@helpers/report';

export interface ResultBoxProps {
  score: number;
  time: number;
}

const ResultBox: FC<ResultBoxProps> = ({ score, time }) => {
  return (
    <div
      className={`p-2 px-4 text-center border rounded text-xs w-fit min-w-[80px] tablet:text-md tablet:min-w-[100px]
      ${getClassNamesForScore(time, score)}
      `}
    >
      <div className="flex items-center">
        <BiSolidReport />
        <span>: {time > 0 ? `${getScoreInteger(score)}%` : 'NA'}</span>
      </div>
      <div className="flex items-center">
        <MdTimer />
        <span>: {time > 0 ? secondsToMinutesSeconds(time) : 'NA'}</span>
      </div>
    </div>
  );
};

export default ResultBox;
