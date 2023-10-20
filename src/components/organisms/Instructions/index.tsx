import QuizActionButton from '@components/atoms/QuizActionButton';
import { quizInstructions } from '@constants/instructionDetails';
import { Dispatch, FC, SetStateAction } from 'react';

export interface InstructionsProps {
  startQuiz: Dispatch<SetStateAction<boolean>>;
}

const Instructions: FC<InstructionsProps> = ({ startQuiz }) => {
  const startQuizHandler = () => {
    startQuiz(true);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-6 border border-gold px-14 py-8 bg-darkBlack rounded-lg">
        <p className="text-xl text-gold font-bold">Instructions</p>
        <div className="text-md p-1">
          {quizInstructions.map((instruction) => (
            <li key={instruction}>{instruction}</li>
          ))}
        </div>
        <div
          role="button"
          className="p-1 flex justify-center"
          onClick={startQuizHandler}
          onKeyPress={startQuizHandler}
          tabIndex={0}
        >
          <QuizActionButton type="next" text="Start Quiz" />
        </div>
      </div>
    </div>
  );
};

export default Instructions;
