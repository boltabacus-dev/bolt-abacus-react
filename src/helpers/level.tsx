import { ReactNode } from 'react';

import ClassAccordion from '@components/organisms/ClassAccordion';

import {
  ClassProgress,
  ClassProgressV2,
  ClassSchema,
} from '@interfaces/apis/student';
import ClassAccordionV2 from '@components/organisms/ClassAccordionV2';

export const createClassAccordions = (
  level: number,
  latestClass: number,
  isLatestLevel: boolean,
  schema: Array<ClassSchema>,
  progress: Array<ClassProgress>
) => {
  const classAccordions: Array<ReactNode> = [];
  let foundLatestClass = false;
  // eslint-disable-next-line array-callback-return
  schema?.map((classSchema, index) => {
    if (!isLatestLevel) {
      if (level === 1 && classSchema.classId === 1) {
        classAccordions.push(
          <ClassAccordion
            key={index}
            levelId={level}
            type="locked"
            classSchema={classSchema}
          />
        );
      } else {
        classAccordions.push(
          <ClassAccordion
            key={index}
            levelId={level}
            type="completed"
            classSchema={classSchema}
          />
        );
      }
    } else if (latestClass && foundLatestClass) {
      classAccordions.push(
        <ClassAccordion
          key={index}
          levelId={level}
          type="locked"
          classSchema={classSchema}
        />
      );
    } else if (latestClass && classSchema.classId === latestClass) {
      foundLatestClass = true;
      if (level === 1 && classSchema.classId === 1) {
        classAccordions.push(
          <ClassAccordion
            key={index}
            levelId={level}
            type="locked"
            classSchema={classSchema}
          />
        );
      } else {
        classAccordions.push(
          <ClassAccordion
            key={index}
            levelId={level}
            type="inprogress"
            progress={progress}
            classSchema={classSchema}
          />
        );
      }
    } else if (latestClass) {
      if (level === 1 && classSchema.classId === 1) {
        classAccordions.push(
          <ClassAccordion
            key={index}
            levelId={level}
            type="locked"
            classSchema={classSchema}
          />
        );
      } else {
        classAccordions.push(
          <ClassAccordion
            key={index}
            levelId={level}
            type="completed"
            classSchema={classSchema}
          />
        );
      }
    }
  });
  return classAccordions;
};

export const createClassAccordionsV2 = (
  level: number,
  progress: Array<ClassProgressV2>
) => {
  const classAccordions: Array<ReactNode> = [];

  classAccordions.push(
    <ClassAccordionV2 key={level} levelId={level} type="locked" classId={1} />
  );

  for (let i = 2; i <= progress.length; i += 1) {
    const classProgress: ClassProgressV2 | undefined = progress.find(
      (obj) => obj.classId === i
    );
    classAccordions.push(
      <ClassAccordionV2
        key={i}
        levelId={level}
        type="inprogress"
        classId={i}
        progress={classProgress}
      />
    );
  }

  for (let i = progress.length + 1; i < 13; i += 1) {
    classAccordions.push(
      <ClassAccordionV2 key={i} levelId={level} type="locked" classId={i} />
    );
  }

  return classAccordions;
};
