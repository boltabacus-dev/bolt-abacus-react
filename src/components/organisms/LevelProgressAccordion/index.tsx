import { FC, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

import ClassProgressAccordion from '@components/organisms/ClassProgressAccordion';

import { LevelProgress } from '@interfaces/apis/teacher';

import styles from './index.module.css';

export interface LevelProgressAccordionProps {
  levelProgress: LevelProgress;
}

const LevelProgressAccordion: FC<LevelProgressAccordionProps> = ({
  levelProgress,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`${styles.levelAccordion} relative p-6 border border-lightGold w-full rounded-lg`}
    >
      <div className="tablet:gap-10 flex tablet:flex-row flex-col gap-5">
        <div
          role="button"
          tabIndex={0}
          className="flex-1"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={() => setIsOpen(!isOpen)}
        >
          <p className="font-medium text-lg">Level {levelProgress.levelId}</p>
        </div>
        <div className="tablet:right-0 tablet:top-0 top-7 right-6 absolute tablet:relative flex justify-center items-center cursor-pointer">
          {isOpen ? (
            <FaAngleUp className="text-lg" onClick={() => setIsOpen(!isOpen)} />
          ) : (
            <FaAngleDown
              className="text-lg"
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'}`}>
        <div className="pt-6">
          <hr className="border border-[#b3b3b3] outline-none" />
          <div className="tablet:px-1 flex tablet:flex-row flex-col gap-4 pt-4 pb-0">
            <div className="flex flex-col flex-1 gap-4">
              <div className="tablet:mt-0 flex flex-col gap-5 py-4">
                {levelProgress.classes.map((classProgress, index) => {
                  return (
                    <div key={index} className="">
                      <ClassProgressAccordion classProgress={classProgress} />
                      <hr className="mt-2 border border-[#3D3D3D] outline-none" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* <div className="tablet:place-items-center grid grid-cols-1 tablet:grid-cols-2">
            <div className="items-center gap-4 grid grid-cols-2 px-1 pt-4 pb-0">
              <p className="font-medium text-md">Oral Test:</p>
              <ResultBox
                score={levelProgress.OralTest}
                time={levelProgress.OralTestTime}
              />
            </div>
            <div className="items-center gap-4 grid grid-cols-2 px-1 pt-4 pb-0">
              <p className="font-medium text-md">Final Test:</p>
              <ResultBox
                score={levelProgress.FinalTest}
                time={levelProgress.FinalTestTime}
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LevelProgressAccordion;
