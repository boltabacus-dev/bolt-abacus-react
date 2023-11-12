import { FC, useState } from 'react';
import { Collapse } from 'react-collapse';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

import { LevelProgress } from '@interfaces/apis/teacher';

import styles from './index.module.css';
import ClassProgressAccordion from '../ClassProgressAccordion';

export interface LevelProgressAccordionProps {
  levelProgress: LevelProgress;
}

const LevelProgressAccordion: FC<LevelProgressAccordionProps> = ({
  levelProgress,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`${styles.levelAccordion} relative p-6 border border-lightGold w-full rounded-lg`}
    >
      <div className="flex flex-col gap-5 tablet:flex-row tablet:gap-10">
        <div
          role="button"
          tabIndex={0}
          className="flex-1"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={() => setIsOpen(!isOpen)}
        >
          <p className="text-lg font-medium">Level {levelProgress.levelId}</p>
        </div>
        <div className="absolute flex items-center justify-center right-6 top-7 tablet:relative tablet:right-0 tablet:top-0 cursor-pointer">
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
      <Collapse isOpened={isOpen}>
        <div className="pt-6">
          <hr className="border outline-none border-[#b3b3b3]" />
          <div className="flex flex-col gap-4 pt-4 pb-0 tablet:px-1 tablet:flex-row">
            <div className="flex flex-col flex-1 gap-4">
              <div className="py-4 flex flex-col gap-5 tablet:mt-0">
                {levelProgress.classes.map((classProgress, index) => {
                  const isLast = levelProgress.classes.length - 1 === index;
                  return (
                    <div key={index} className="">
                      <ClassProgressAccordion classProgress={classProgress} />
                      {!isLast && (
                        <hr className="mt-2 border outline-none border-[#3D3D3D]" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default LevelProgressAccordion;
