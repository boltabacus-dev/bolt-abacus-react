import { FC, useState } from 'react';
import { Collapse } from 'react-collapse';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

import { ClassProgress } from '@interfaces/apis/teacher';
import { getScoreInteger } from '@helpers/batch';
import { PASS_MARKS } from '@constants/app';

export interface ClassProgressAccordionProps {
  classProgress: ClassProgress;
}

const ClassProgressAccordion: FC<ClassProgressAccordionProps> = ({
  classProgress,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full py-1 rounded-lg">
      <div className="flex flex-col gap-5 tablet:flex-row tablet:gap-10">
        <div
          role="button"
          tabIndex={0}
          className="flex-1"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={() => setIsOpen(!isOpen)}
        >
          <p className="text-lg font-medium">Class {classProgress.classId}</p>
        </div>
        <div className="absolute flex items-center justify-center cursor-pointer right-1 top-3 tablet:relative tablet:right-0 tablet:top-0">
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
        <div className="">
          <div className="flex flex-col gap-4 pt-4 pb-0 tablet:p-2 tablet:flex-row">
            <div className="flex flex-col flex-1 gap-4">
              <div className="flex flex-col gap-3 py-4 tablet:text-lg tablet:mt-0">
                <div className="grid grid-cols-3 text-[#6D6D6D] pb-2">
                  <div />
                  <div className="flex items-center justify-center font-semibold">
                    Classwork
                  </div>
                  <div className="flex items-center justify-center font-semibold">
                    Homework
                  </div>
                </div>
                {classProgress.topics.map((topicProgress, index) => {
                  return (
                    <div key={index} className="grid grid-cols-3">
                      <div className="text-[#6D6D6D] flex items-center">
                        Topic {topicProgress.topicId}
                      </div>
                      <div className="flex items-center justify-center font-semibold">
                        <span
                          className={`p-2 px-4 text-center border rounded text-xs tablet:text-md min-w-[75px] tablet:min-w-[86px]
													${
                            topicProgress.Classwork >= PASS_MARKS
                              ? 'border-green bg-green/10 text-green'
                              : 'border-red bg-red/10 text-red'
                          }`}
                        >
                          {getScoreInteger(topicProgress.Classwork)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-center font-semibold">
                        <span
                          className={`p-2 px-4 text-center border rounded text-xs tablet:text-md min-w-[75px] tablet:min-w-[86px]
													${
                            topicProgress.Homework >= PASS_MARKS
                              ? 'border-green bg-green/10 text-green'
                              : 'border-red bg-red/10 text-red'
                          }`}
                        >
                          {getScoreInteger(topicProgress.Homework)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-10 px-1">
                <div className="text-[#6D6D6D] font-semibold flex items-center tablet:text-lg ">
                  Test
                </div>
                <div className="flex items-center justify-center font-semibold">
                  <span
                    className={`p-2 px-4 text-center border rounded text-xs tablet:text-md min-w-[75px] tablet:min-w-[86px]
													${
                            classProgress.Test >= PASS_MARKS
                              ? 'border-green bg-green/10 text-green'
                              : 'border-red bg-red/10 text-red'
                          }`}
                  >
                    {getScoreInteger(classProgress.Test)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default ClassProgressAccordion;
