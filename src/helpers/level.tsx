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
      classAccordions.push(
        <ClassAccordion
          key={classSchema.classId}
          levelId={level}
          type="completed"
          classSchema={classSchema}
        />
      );
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
      classAccordions.push(
        <ClassAccordion
          key={classSchema.classId}
          levelId={level}
          type="inprogress"
          progress={progress}
          classSchema={classSchema}
        />
      );
    } else if (latestClass) {
      classAccordions.push(
        <ClassAccordion
          key={classSchema.classId}
          levelId={level}
          type="completed"
          classSchema={classSchema}
        />
      );
    }
  });
  return classAccordions;
};