import { FC } from 'react';

const DashedLine: FC = () => {
  return (
    <svg
      className="w-[2px] left-4 top-2 -translate-x-1/2 absolute desktop:ml-10 h-full -z-10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="1"
        y1="-4.37114e-08"
        x2="1.00004"
        y2="8000"
        stroke="#FACB25"
        strokeWidth="2"
        strokeDasharray="7 7"
      />
    </svg>
  );
};

export default DashedLine;
