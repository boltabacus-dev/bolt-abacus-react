import { FC } from 'react';

import PracticeCard from '@components/molecules/PracticeCard';

import {
  STUDENT_FLASHCARDS,
  STUDENT_SET,
  STUDENT_TIMED,
  STUDENT_UNTIMED,
} from '@constants/routes';

export interface PracticeSectionProps {}

const PracticeSection: FC<PracticeSectionProps> = () => {
  return (
    <div className="tablet:p-10 desktop:px-24 flex flex-col justify-between gap-6 px-6 py-2 min-h-full">
      <div className="flex flex-col gap-3">
        <p className="font-bold text-lg tablet:text-xl">
          Addition and Subtraction
        </p>
        <div className="gap-6 grid grid-cols-1 desktop:grid-cols-4 tablet:grid-cols-3 py-2">
          <PracticeCard
            title="Flash Cards"
            image="/images/flashcards.png"
            description="Use flashcards to test your knowledge! Quickly go through each card and try to get the right answer."
            link={`${STUDENT_FLASHCARDS}`}
            color="red"
          />
          <PracticeCard
            title="No Rush Mastery"
            image="/images/unlimited-time.png"
            description="Take all the time you need to answer each question. There's no rush, just do your best!"
            link={`${STUDENT_UNTIMED}/addition`}
            color="blue"
          />
          <PracticeCard
            title="Question Countdown"
            image="/images/timed.png"
            description="The clock is ticking! Lets see how many questions you can answer before time runs out"
            link={`${STUDENT_TIMED}/addition`}
            color="green"
          />
          <PracticeCard
            title="Set Practice"
            image="/images/set.png"
            description="You can set the number of questions and the time limit. The clock is ticking! Answer them all before time runs out"
            link={`${STUDENT_SET}/addition`}
            color="pink"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-bold text-lg tablet:text-xl">Multiplication</p>
        <div className="gap-6 grid grid-cols-1 desktop:grid-cols-4 tablet:grid-cols-3 py-2">
          <PracticeCard
            title="No Rush Mastery"
            image="/images/unlimited-time.png"
            description="Take all the time you need to answer each question. There's no rush, just do your best!"
            link={`${STUDENT_UNTIMED}/multiplication`}
            color="blue"
          />
          <PracticeCard
            title="Question Countdown"
            image="/images/timed.png"
            description="The clock is ticking! Lets see how many questions you can answer before time runs out"
            link={`${STUDENT_TIMED}/multiplication`}
            color="green"
          />
          <PracticeCard
            title="Set Practice"
            image="/images/set.png"
            description="You can set the number of questions and the time limit. The clock is ticking! Answer them all before time runs out"
            link={`${STUDENT_SET}/multiplication`}
            color="pink"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-bold text-lg tablet:text-xl">Division</p>
        <div className="gap-6 grid grid-cols-1 desktop:grid-cols-4 tablet:grid-cols-3 py-2">
          <PracticeCard
            title="No Rush Mastery"
            image="/images/unlimited-time.png"
            description="Take all the time you need to answer each question. There's no rush, just do your best!"
            link={`${STUDENT_UNTIMED}/division`}
            color="blue"
          />
          <PracticeCard
            title="Question Countdown"
            image="/images/timed.png"
            description="The clock is ticking! Lets see how many questions you can answer before time runs out"
            link={`${STUDENT_TIMED}/division`}
            color="green"
          />
          <PracticeCard
            title="Set Practice"
            image="/images/set.png"
            description="You can set the number of questions and the time limit. The clock is ticking! Answer them all before time runs out"
            link={`${STUDENT_SET}/division`}
            color="pink"
          />
        </div>
      </div>
    </div>
  );
};

export default PracticeSection;
