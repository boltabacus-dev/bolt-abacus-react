import { FC, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { TbReport } from 'react-icons/tb';

import AccordionButton from '@components/atoms/AccordionButton';
import Button from '@components/atoms/Button';
import ClassAccordionRow from '@components/molecules/ClassAccordionRow';
import ProgressBar from '@components/atoms/ProgressBar';

import { ClassProgress, ClassSchema } from '@interfaces/apis/student';

import styles from './index.module.css';

export interface ClassAccordionProps {
  type: 'completed' | 'inprogress' | 'locked';
  levelId: number;
  classSchema: ClassSchema;
  progress?: Array<ClassProgress>;
}

const createAccordionRows = (
  levelId: number,
  classSchema: ClassSchema,
  progress: Array<ClassProgress>
) => {
  const accordionRows: Array<ReactNode> = [];
  for (let i = 0; i < classSchema.topicIds.length; i += 1) {
    const topicId = classSchema.topicIds[i];

    const classwork = progress?.find(
      (quiz) => quiz.QuizType === 'Classwork' && quiz.topicId === topicId
    );
    const homework = progress?.find(
      (quiz) => quiz.QuizType === 'Homework' && quiz.topicId === topicId
    );

    if (!progress) {
      accordionRows.push(
        <ClassAccordionRow
          key={i}
          classwork="green"
          homework="green"
          text={`Topic ${i + 1}`}
          link={`/student/quiz/${levelId}/${classSchema.classId}/${topicId}`}
        />
      );
    } else {
      accordionRows.push(
        <ClassAccordionRow
          key={i}
          classwork={
            classwork
              ? classwork.isPass
                ? 'green'
                : classwork.percentage > 0
                  ? 'yellow'
                  : 'grey'
              : 'grey'
          }
          homework={
            homework
              ? homework.isPass
                ? 'green'
                : homework.percentage > 0
                  ? 'yellow'
                  : 'grey'
              : 'grey'
          }
          text={`Topic ${i + 1}`}
          link={`/student/quiz/${levelId}/${classSchema.classId}/${topicId}`}
        />
      );
    }
  }
  return accordionRows;
};

const createTestAccordionButton = (
  levelId: number,
  classSchema: ClassSchema,
  progress: Array<ClassProgress>
) => {
  if (!progress) {
    return (
      <AccordionButton
        type="green"
        text="Test"
        link={`/student/test/${levelId}/${classSchema.classId}`}
      />
    );
  }
  const test = progress?.find((quiz) => quiz.QuizType === 'Test');
  const type = test
    ? test?.isPass
      ? 'green'
      : test?.percentage > 0
        ? 'yellow'
        : 'grey'
    : 'grey';

  return (
    <AccordionButton
      type={type}
      text="Test"
      link={`/student/test/${levelId}/${classSchema.classId}`}
    />
  );
};

const createProgressBar = (
  type: 'completed' | 'inprogress' | 'locked',
  progress: Array<ClassProgress>
) => {
  if (type === 'completed') {
    return <ProgressBar percentage={100} type="blue" />;
  }
  if (type === 'inprogress') {
    const passProgress = progress.filter((p) => p.isPass);
    return (
      <ProgressBar
        percentage={(passProgress.length / progress.length) * 100}
        type="purple"
        isBgBlack
      />
    );
  }
  return <ProgressBar percentage={0} type="locked" isBgBlack />;
};

const ClassAccordion: FC<ClassAccordionProps> = ({
  type,
  classSchema,
  levelId,
  progress,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`${styles.classAccordion} relative p-6 border border-lightGold w-full rounded-lg`}
    >
      <div className="tablet:gap-10 flex tablet:flex-row flex-col gap-5">
        <div className="tablet:gap-10 flex tablet:flex-row flex-col flex-1 tablet:justify-center tablet:items-center gap-5">
          <p className="font-medium text-lg">Class {classSchema.classId}</p>
          <div className="flex flex-1 justify-center items-center">
            {createProgressBar(type, progress!)}
          </div>
        </div>
        <div className="flex flex-1 gap-6">
          <div className="flex-1">
            {type === 'completed' && (
              <div
                role="button"
                tabIndex={0}
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={() => setIsOpen(!isOpen)}
              >
                <Button type="black" text="Finished" />
              </div>
            )}
            {type === 'inprogress' && (
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
              <Link to={`/student/report/${levelId}/${classSchema.classId}`}>
                <Button type="blackWhite" text="Finished">
                  <div className="flex justify-center items-center gap-2">
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
        <div className={`${isOpen ? 'block' : 'hidden'}`}>
          <div className="pt-6">
            <hr className="border border-darkGrey" />
            <div className="tablet:p-4 flex tablet:flex-row flex-col gap-4 pt-4 pb-0">
              <div className="flex flex-col flex-1 gap-4">
                <div className="hidden tablet:block">
                  <ClassAccordionRow
                    classwork="grey"
                    homework="grey"
                    text="Summary"
                  />
                </div>
                {createAccordionRows(levelId, classSchema, progress!)}
              </div>
              <div className="tablet:mt-0 mt-4">
                {createTestAccordionButton(levelId, classSchema, progress!)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassAccordion;
