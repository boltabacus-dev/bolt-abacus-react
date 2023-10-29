import { ReactNode } from 'react';

import ClassAccordion from '@components/organisms/ClassAccordion';

import { ClassProgress, ClassSchema } from '@interfaces/apis/student';

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
  schema?.map((classSchema) => {
    if (!isLatestLevel) {
      if (level === 1 && classSchema.classId === 1) {
        classAccordions.push(
          <ClassAccordion
            key={classSchema.classId}
            levelId={level}
            type="locked"
            classSchema={classSchema}
          />
        );
      } else {
        classAccordions.push(
          <ClassAccordion
            key={classSchema.classId}
            levelId={level}
            type="completed"
            classSchema={classSchema}
          />
        );
      }
    } else if (latestClass && foundLatestClass) {
      classAccordions.push(
        <ClassAccordion
          key={classSchema.classId}
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
            key={classSchema.classId}
            levelId={level}
            type="locked"
            classSchema={classSchema}
          />
        );
      } else {
        classAccordions.push(
          <ClassAccordion
            key={classSchema.classId}
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
            key={classSchema.classId}
            levelId={level}
            type="locked"
            classSchema={classSchema}
          />
        );
      } else {
        classAccordions.push(
          <ClassAccordion
            key={classSchema.classId}
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
