import { FC, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

import ResultBox from '@components/atoms/ResultBox';

import { ClassProgress } from '@interfaces/apis/teacher';

export interface ClassProgressAccordionProps {
  classProgress: ClassProgress;
}

const ClassProgressAccordion: FC<ClassProgressAccordionProps> = ({
  classProgress,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative py-1 rounded-lg w-full">
      <div className="tablet:gap-10 flex tablet:flex-row flex-col gap-5">
        <div
          role="button"
          tabIndex={0}
          className="flex-1"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={() => setIsOpen(!isOpen)}
        >
          <p className="font-medium text-lg">Class {classProgress.classId}</p>
        </div>
        <div className="tablet:right-0 tablet:top-0 top-3 right-1 absolute tablet:relative flex justify-center items-center cursor-pointer">
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
        <div className="">
          <div className="tablet:p-2 flex tablet:flex-row flex-col gap-4 pt-4 pb-0">
            <div className="flex flex-col flex-1 gap-4">
              <div className="tablet:mt-0 flex flex-col gap-3 py-4 tablet:text-lg">
                <div className="grid grid-cols-3 pb-2 text-[#6D6D6D]">
                  <div />
                  <div className="flex justify-center items-center font-semibold">
                    Classwork
                  </div>
                  <div className="flex justify-center items-center font-semibold">
                    Homework
                  </div>
                </div>
                {classProgress.topics.map((topicProgress, index) => {
                  return (
                    <div key={index} className="grid grid-cols-3">
                      <div className="flex items-center text-[#6D6D6D]">
                        Topic {topicProgress.topicId}
                      </div>
                      <div className="flex justify-center items-center font-semibold">
                        <ResultBox
                          score={topicProgress.Classwork}
                          time={topicProgress.ClassworkTime}
                        />
                      </div>
                      <div className="flex justify-center items-center font-semibold">
                        <ResultBox
                          score={topicProgress.Homework}
                          time={topicProgress.HomeworkTime}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-10 px-1">
                <div className="flex items-center font-semibold text-[#6D6D6D] tablet:text-lg">
                  Test
                </div>
                <div className="flex justify-center items-center font-semibold">
                  <ResultBox
                    time={classProgress.Time}
                    score={classProgress.Test}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassProgressAccordion;
