import { FC } from 'react';

import AccordionButton from '@components/atoms/AccordionButton';

export interface ClassAccordionRowProps {
  classwork: 'info' | 'grey' | 'green' | 'yellow' | 'red';
  homework: 'info' | 'grey' | 'green' | 'yellow' | 'red';
  text: string;
  link?: string;
}

const ClassAccordionRow: FC<ClassAccordionRowProps> = ({
  classwork,
  homework,
  text,
  link,
}) => {
  const classworkText =
    classwork === 'green' || classwork === 'yellow'
      ? 'Retake'
      : classwork === 'red'
      ? 'Try Again'
      : classwork === 'info'
      ? 'Classwork'
      : 'Take Test';

  const homeworkText =
    homework === 'green' || homework === 'yellow'
      ? 'Retake'
      : homework === 'red'
      ? 'Try Again'
      : homework === 'info'
      ? 'Homework'
      : 'Take Test';

  return (
    <div className="flex flex-col gap-4 tablet:flex-row">
      <p className="flex-1 text-lg font-medium">{text}</p>
      <div className="flex flex-col flex-1 gap-4 tablet:flex-row desktop:gap-16">
        <AccordionButton
          type={classwork === 'info' ? 'grey' : classwork}
          text={classworkText}
          link={link && `${link}/classwork`}
          withoutIcon={text === 'Summary'}
        />
        <AccordionButton
          type={homework === 'info' ? 'grey' : homework}
          text={homeworkText}
          link={link && `${link}/homework`}
          withoutIcon={text === 'Summary'}
        />
      </div>
    </div>
  );
};

export default ClassAccordionRow;
