import { Dispatch, FC, SetStateAction } from 'react';
import swal from 'sweetalert';

import Button from '@components/atoms/Button';

export interface FlashCardsFormProps {
  operation: 'addition' | 'multiplication' | 'division';
  numberOfQuestions: number;
  setNumberOfQuestions: Dispatch<SetStateAction<number>>;
  numberOfDigits: number;
  setNumberOfDigits: Dispatch<SetStateAction<number>>;
  isZigzag: boolean;
  setIsZigzag: Dispatch<SetStateAction<boolean>>;
  speed: 'fast' | 'medium' | 'slow';
  setSpeed: Dispatch<SetStateAction<'fast' | 'medium' | 'slow'>>;
  numberOfRows: number;
  setNumberOfRows: Dispatch<SetStateAction<number>>;
  handleStartQuiz: () => void;
}

const FlashCardsForm: FC<FlashCardsFormProps> = ({
  operation,
  numberOfDigits,
  isZigzag,
  numberOfQuestions,
  speed,
  numberOfRows,
  setNumberOfQuestions,
  setNumberOfDigits,
  setIsZigzag,
  setSpeed,
  setNumberOfRows,
  handleStartQuiz,
}) => {
  const verifyAndStartQuiz = () => {
    if (
      !numberOfQuestions ||
      numberOfQuestions <= 0 ||
      numberOfQuestions > 100
    ) {
      swal({
        title: 'Invalid number of questions',
        text: 'Please enter between 1 and 100 questions',
        icon: 'error',
      });
      return;
    }

    if (!numberOfDigits || numberOfDigits <= 0 || numberOfDigits > 5) {
      swal({
        title: 'Invalid number of digits',
        text: 'Please enter between 1 and 5 digits',
        icon: 'error',
      });
      return;
    }

    if (!numberOfRows || numberOfRows <= 0 || numberOfRows > 5) {
      swal({
        title: 'Invalid number of rows',
        text: 'Please enter between 1 and 5 digits',
        icon: 'error',
      });
      return;
    }

    handleStartQuiz();
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-bold text-gold text-xl">Flash Cards Settings</h2>
      <div className="gap-4 grid grid-cols-1 tablet:grid-cols-2 p-4">
        <div className="flex items-center gap-4 py-4">
          <p className="w-40 text-md">Number of Questions: </p>
          <input
            type="number"
            className="px-2 py-1 border border-grey rounded-md w-20 text-black text-center"
            value={Number(numberOfQuestions)}
            max={100}
            onChange={(e) => setNumberOfQuestions(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="flex items-center gap-4 py-4">
          <p className="w-40 text-md">Number of Digits: </p>
          <input
            type="number"
            className="px-2 py-1 border border-grey rounded-md w-20 text-black text-center"
            value={Number(numberOfDigits)}
            max={5}
            onChange={(e) => setNumberOfDigits(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="flex items-center gap-4 py-4">
          <p className="w-40 text-md">Number of Rows: </p>
          <input
            type="number"
            className="px-2 py-1 border border-grey rounded-md w-20 text-black text-center"
            value={Number(numberOfRows)}
            max={5}
            onChange={(e) => setNumberOfRows(parseInt(e.target.value, 10))}
          />
        </div>
        {operation === 'addition' && (
          <div className="flex items-center gap-4 py-4">
            <p className="w-40 text-md">Zig-Zag Pattern: </p>
            <input
              type="checkbox"
              className="px-2 py-1 border border-grey rounded-md w-20 h-4 text-black text-center"
              checked={isZigzag}
              onChange={(e) => setIsZigzag(e.target.checked)}
            />
          </div>
        )}
        <div className="flex items-center gap-4 py-4">
          <p className="w-40 text-md">Flash Card Speed: </p>
          <select
            name="speed"
            className="px-2 py-1 border border-grey rounded-md w-fit text-black text-center"
            id="speed"
            value={speed}
            onChange={(e) =>
              setSpeed(e.target.value as 'fast' | 'medium' | 'slow')
            }
          >
            <option className="p-4" value="fast">
              Fast (1000 ms)
            </option>
            <option className="p-4" value="medium">
              Medium (1500 ms)
            </option>
            <option className="p-4" value="slow">
              Slow (2500 ms)
            </option>
          </select>
        </div>
      </div>
      <div
        className="text-center"
        onClick={() => verifyAndStartQuiz()}
        tabIndex={0}
        role="button"
        onKeyDown={() => verifyAndStartQuiz()}
      >
        <Button type="primary" text="Start Quiz" />
      </div>
    </div>
  );
};

export default FlashCardsForm;
