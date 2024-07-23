import { FC, ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { TbReport } from 'react-icons/tb';
import { Collapse } from 'react-collapse';

import AccordionButton from '@components/atoms/AccordionButton';
import Button from '@components/atoms/Button';
import ProgressBar from '@components/atoms/ProgressBar';
import ClassAccordionRow from '@components/molecules/ClassAccordionRow';

import { ClassProgressV2, TopicProgressV2 } from '@interfaces/apis/student';
import { getButtonTypeForScore } from '@helpers/report';

import { PASS_MARKS } from '@constants/app';

import styles from './index.module.css';

export interface ClassAccordionV2Props {
  type: 'inprogress' | 'locked';
  levelId: number;
  classId: number;
  progress?: ClassProgressV2;
}

const createAccordionRows = (
  levelId: number,
  classId: number,
  progress: Record<string, TopicProgressV2> | undefined
) => {
  const accordionRows: Array<ReactNode> = [];
  for (let i = 1; i < Object.keys(progress!).length; i += 1) {
    const topicProgress: TopicProgressV2 = progress![i];

    const classwork = topicProgress.Classwork;
    const homework = topicProgress.Homework;

    accordionRows.push(
      <ClassAccordionRow
        key={i}
        classwork={getButtonTypeForScore(
          classwork?.time || 0,
          classwork?.percentage || 0
        )}
        homework={getButtonTypeForScore(
          homework?.time || 0,
          homework?.percentage || 0
        )}
        text={`Topic ${i}`}
        link={`/student/quiz/${levelId}/${classId}/${i}`}
      />
    );
  }
  return accordionRows;
};

const createTestAccordionButton = (
  levelId: number,
  classId: number,
  progress: TopicProgressV2 | undefined
) => {
  const type = getButtonTypeForScore(
    progress?.Test?.time || 0,
    progress?.Test?.percentage || 0
  );

  return (
    <AccordionButton
      type={type}
      text="Test"
      link={`/student/test/${levelId}/${classId}`}
    />
  );
};

const ClassAccordionV2: FC<ClassAccordionV2Props> = ({
  type,
  levelId,
  classId,
  progress,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);

  useEffect(() => {
    if (progress === undefined) return;

    let totalQuiz = 0;
    let passedQuiz = 0;

    const classProgress: Record<string, TopicProgressV2> | undefined =
      progress?.topics;
    Object.entries(classProgress!).forEach(([, topicProgress]) => {
      if (topicProgress.Homework) {
        totalQuiz += 1;
        if (
          topicProgress.Homework.time > 0 &&
          topicProgress.Homework.percentage >= PASS_MARKS
        )
          passedQuiz += 1;
      }
      if (topicProgress.Classwork) {
        totalQuiz += 1;
        if (
          topicProgress.Classwork.time > 0 &&
          topicProgress.Classwork.percentage >= PASS_MARKS
        )
          passedQuiz += 1;
      }
      if (topicProgress.Test) {
        totalQuiz += 1;
        if (
          topicProgress.Test.time > 0 &&
          topicProgress.Test.percentage >= PASS_MARKS
        )
          passedQuiz += 1;
      }
    });
    setProgressPercentage((passedQuiz / totalQuiz) * 100);
  }, [classId, progress]);

  return (
    <div
      className={`${styles.classAccordion} relative p-6 border border-lightGold w-full rounded-lg`}
    >
      <div className="flex flex-col gap-5 tablet:flex-row tablet:gap-10">
        <div className="flex flex-col flex-1 gap-5 tablet:flex-row tablet:gap-10 tablet:justify-center tablet:items-center">
          <p className="text-lg font-medium">Class {classId}</p>
          <div className="flex items-center justify-center flex-1">
            {type === 'inprogress' && (
              <ProgressBar
                percentage={progressPercentage}
                type="purple"
                isBgBlack
              />
            )}
            {type === 'locked' && (
              <ProgressBar percentage={0} type="locked" isBgBlack />
            )}
          </div>
        </div>
        <div className="flex flex-1 gap-6">
          <div className="flex-1">
            {type === 'inprogress' && progressPercentage === 100 && (
              <div
                role="button"
                tabIndex={0}
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={() => setIsOpen(!isOpen)}
              >
                <Button type="black" text="Finished" />
              </div>
            )}
            {type === 'inprogress' && progressPercentage !== 100 && (
              <div
                role="button"
                tabIndex={0}
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={() => setIsOpen(!isOpen)}
              >
                <Button type="primary" text={`Let's Go !`} />
              </div>
            )}
          </div>
          <div className="flex-1">
            {type !== 'locked' && (
              <Link to={`/student/report/${levelId}/${classId}`}>
                <Button type="blackWhite" text="Finished">
                  <div className="flex items-center justify-center gap-2">
                    <TbReport className="text-lg" />
                    <p>Report</p>
                  </div>
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div
          className={`absolute flex items-center justify-center right-6 top-6 tablet:relative tablet:right-0 tablet:top-0 ${
            type === 'locked' ? 'opacity-0' : 'cursor-pointer'
          }`}
        >
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
      {type !== 'locked' && (
        <Collapse isOpened={isOpen}>
          <div className="pt-6">
            <hr className="border border-darkGrey" />
            <div className="flex flex-col gap-4 pt-4 pb-0 tablet:p-4 tablet:flex-row">
              <div className="flex flex-col flex-1 gap-4">
                <div className="hidden tablet:block">
                  <ClassAccordionRow
                    classwork="info"
                    homework="info"
                    text="Summary"
                  />
                </div>
                {createAccordionRows(
                  levelId,
                  progress?.classId || 0,
                  progress?.topics
                )}
              </div>
              <div className="mt-4 tablet:mt-0">
                {createTestAccordionButton(
                  levelId,
                  progress?.classId || 0,
                  progress?.topics[0]
                )}
              </div>
            </div>
          </div>
        </Collapse>
      )}
    </div>
  );
};

export default ClassAccordionV2;
