import { FC } from 'react';

export interface QuizBoxProps {}

const QuizBox: FC<QuizBoxProps> = () => {
  return (
    <div className="w-full min-h-[300px] flex justify-center items-center p-2 py-6 bg-darkBlack shadow-boxWhite rounded-2xl">
      <div className="flex items-center w-full text-lg font-bold justify-evenly tablet:text-xl">
        <div className="flex flex-col">
          <div className="flex items-center gap-4 tablet:gap-10">
            <span>+</span>
            <div className="flex flex-col items-end gap-1 tracking-widest">
              <span>2</span>
              <span>1245</span>
              <span>12345</span>
              <span>345</span>
              <span>12345</span>
              <span>1235</span>
            </div>
          </div>
        </div>
        <div className="text-2xl text-gold desktop:text-3xl"> = </div>
        <div className="">
          <input
            className="w-28 px-4 py-3 bg-darkBlack outline-none border text-center border-[#A0A0A0] rounded-lg tablet:w-36"
            type="number"
          />
        </div>
      </div>
    </div>
  );
};

export default QuizBox;
