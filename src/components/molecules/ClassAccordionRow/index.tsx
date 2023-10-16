import { FC } from 'react';

import AccordionButton from '@components/atoms/AccordionButton';

export interface ClassAccordionRowProps {
  classwork: 'grey' | 'green' | 'yellow';
  homework: 'grey' | 'green' | 'yellow';
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
    classwork === 'green'
      ? 'Retake'
      : classwork === 'yellow'
      ? 'Try Again'
      : 'Classwork';

  const homeworkText =
    homework === 'green'
      ? 'Retake'
      : homework === 'yellow'
      ? 'Try Again'
      : 'Homework';

  return (
    <div className="flex flex-col gap-4 tablet:flex-row">
      <p className="flex-1 text-lg font-medium">{text}</p>
      <div className="flex flex-col flex-1 gap-4 tablet:flex-row desktop:gap-16">
        <AccordionButton
          type={classwork}
          text={classworkText}
          link={link && `${link}/classwork`}
        />
        <AccordionButton
          type={homework}
          text={homeworkText}
          link={link && `${link}/homework`}
        />
      </div>
    </div>
  );
};

export default ClassAccordionRow;
