import { Dispatch, FC, SetStateAction } from 'react';
import swal from 'sweetalert';

import Button from '@components/atoms/Button';

export interface TimedPracticeFormProps {
  operation: 'addition' | 'multiplication' | 'division';
  timeLimit: number;
  setTimeLimit: Dispatch<SetStateAction<number>>;
  numberOfDigitsLeft: number;
  setNumberOfDigitsLeft: Dispatch<SetStateAction<number>>;
  numberOfDigitsRight: number;
  setNumberOfDigitsRight: Dispatch<SetStateAction<number>>;
  isZigzag: boolean;
  setIsZigzag: Dispatch<SetStateAction<boolean>>;
  numberOfRows: number;
  setNumberOfRows: Dispatch<SetStateAction<number>>;
  includeSubtraction: boolean;
  setIncludeSubtraction: Dispatch<SetStateAction<boolean>>;
  persistNumberOfDigits: boolean;
  setPersistNumberOfDigits: Dispatch<SetStateAction<boolean>>;
  includeDecimals: boolean;
  setIncludeDecimals: Dispatch<SetStateAction<boolean>>;
  handleStartQuiz: () => void;
}

const TimedPracticeForm: FC<TimedPracticeFormProps> = ({
  operation,
  numberOfDigitsLeft,
  numberOfDigitsRight,
  isZigzag,
  timeLimit,
  numberOfRows,
  includeSubtraction,
  persistNumberOfDigits,
  includeDecimals,
  setTimeLimit,
  setNumberOfDigitsLeft,
  setNumberOfDigitsRight,
  setIsZigzag,
  setNumberOfRows,
  setIncludeSubtraction,
  setPersistNumberOfDigits,
  setIncludeDecimals,
  handleStartQuiz,
}) => {
  const verifyAndStartQuiz = () => {
    if (!timeLimit || timeLimit <= 0 || timeLimit > 200) {
      swal({
        title: 'Invalid time limit',
        text: 'Please enter between 1 and 200 minutes',
        icon: 'error',
      });
      return;
    }

    if (
      !numberOfDigitsLeft ||
      numberOfDigitsLeft <= 0 ||
      numberOfDigitsLeft > 15
    ) {
      swal({
        title: `${operation === 'division' ? 'Invalid number of digits in Numerator' : operation === 'multiplication' ? 'Invalid number of digits in First Operand' : 'Invalid number of digits'}`,
        text: 'Please enter between 1 and 15 digits',
        icon: 'error',
      });
      return;
    }

    if (
      operation !== 'division' &&
      (!numberOfDigitsRight ||
        numberOfDigitsRight <= 0 ||
        numberOfDigitsRight > 15)
    ) {
      swal({
        title: 'Invalid number of digits in Second Operand',
        text: 'Please enter between 1 and 15 digits',
        icon: 'error',
      });
      return;
    }

    if (
      operation === 'division' &&
      (!numberOfDigitsRight ||
        numberOfDigitsRight <= 0 ||
        numberOfDigitsRight > 5)
    ) {
      swal({
        title: 'Invalid number of digits',
        text: 'Please enter between 1 and 5 digits',
        icon: 'error',
      });
      return;
    }

    if (operation === 'division' && numberOfDigitsRight > numberOfDigitsLeft) {
      swal({
        title: 'Invalid number of digits',
        text: 'Numerator digits should be greater than denominator digits',
        icon: 'error',
      });
      return;
    }

    if (!numberOfRows || numberOfRows <= 0 || numberOfRows > 15) {
      swal({
        title: 'Invalid number of rows',
        text: 'Please enter between 1 and 15 digits',
        icon: 'error',
      });
      return;
    }

    handleStartQuiz();
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="mb-4 font-bold text-gold text-xl">
        Question Countdown Settings
      </h2>
      <div className="flex flex-col items-center gap-4 bg-black p-8 border-2 border-boxGold rounded-lg">
        <div className="tablet:gap-4 items-center gap-2 grid grid-cols-2 py-4 w-full">
          <p className="text-md text-left">Time Limit (minutes): </p>
          <input
            type="number"
            className="px-2 py-1 border border-grey rounded-md focus:outline-none w-full text-black text-center"
            value={timeLimit}
            max={200}
            min={1}
            onChange={(e) => setTimeLimit(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="tablet:gap-4 items-center gap-2 grid grid-cols-2 py-4 w-full">
          <p className="text-md text-left">
            {operation === 'division'
              ? 'Number of Digits on Numerator: '
              : operation === 'multiplication'
                ? 'Number of Digits on First Operand: '
                : ' Number of Digits: '}
          </p>
          <input
            type="number"
            className="px-2 py-1 border border-grey rounded-md focus:outline-none w-full text-black text-center"
            value={numberOfDigitsLeft}
            min={1}
            max={15}
            onChange={(e) =>
              setNumberOfDigitsLeft(parseInt(e.target.value, 10))
            }
          />
        </div>
        {(operation === 'division' || operation === 'multiplication') && (
          <div className="tablet:gap-4 items-center gap-2 grid grid-cols-2 py-4 w-full">
            <p className="text-md text-left">
              {operation === 'multiplication'
                ? 'Number of Digits in Second Operand:'
                : 'Number of Digits on Denominator: '}
            </p>
            <input
              type="number"
              className="px-2 py-1 border border-grey rounded-md focus:outline-none w-full text-black text-center"
              value={numberOfDigitsRight}
              min={1}
              max={operation === 'division' ? 5 : 15}
              onChange={(e) =>
                setNumberOfDigitsRight(parseInt(e.target.value, 10))
              }
            />
          </div>
        )}
        {operation !== 'division' && operation !== 'multiplication' && (
          <div className="tablet:gap-4 items-center gap-2 grid grid-cols-2 py-4 w-full">
            <p className="text-md text-left">Number of Rows: </p>
            <input
              type="number"
              className="px-2 py-1 border border-grey rounded-md focus:outline-none w-full text-black text-center"
              value={numberOfRows}
              max={15}
              min={1}
              onChange={(e) => setNumberOfRows(parseInt(e.target.value, 10))}
            />
          </div>
        )}
        {operation === 'addition' && (
          <div className="tablet:gap-4 items-center gap-2 grid grid-cols-2 py-4 w-full">
            <p className="text-md text-left">Zig-Zag Pattern: </p>
            <input
              type="checkbox"
              className="bg-gold px-2 py-1 border rounded-md w-full h-4 text-black text-center accent-gold"
              checked={isZigzag}
              onChange={(e) => setIsZigzag(e.target.checked)}
            />
          </div>
        )}
        {operation === 'addition' && (
          <div className="tablet:gap-4 items-center gap-2 grid grid-cols-2 py-4 w-full">
            <p className="text-md text-left">Include Subtraction: </p>
            <input
              type="checkbox"
              className="bg-gold px-2 py-1 border rounded-md w-full h-4 text-black text-center accent-gold"
              checked={includeSubtraction}
              onChange={(e) => setIncludeSubtraction(e.target.checked)}
            />
          </div>
        )}
        {operation === 'addition' && (
          <div className="tablet:gap-4 items-center gap-2 grid grid-cols-2 py-4 w-full">
            <p className="text-md text-left">
              Same number of digits in answer as question:
            </p>
            <input
              type="checkbox"
              className="bg-gold px-2 py-1 border rounded-md w-full h-4 text-black text-center accent-gold"
              checked={persistNumberOfDigits}
              onChange={(e) => setPersistNumberOfDigits(e.target.checked)}
            />
          </div>
        )}
        {operation === 'division' && (
          <div className="tablet:gap-4 items-center gap-2 grid grid-cols-2 py-4 w-full">
            <p className="text-md text-left">Include Decimal:</p>
            <input
              type="checkbox"
              className="bg-gold px-2 py-1 border rounded-md w-full h-4 text-black text-center accent-gold"
              checked={includeDecimals}
              onChange={(e) => setIncludeDecimals(e.target.checked)}
            />
          </div>
        )}
        <div className="tablet:gap-4 items-center gap-2 grid grid-cols-1 w-full">
          <div
            className="text-center"
            onClick={() => verifyAndStartQuiz()}
            tabIndex={0}
            role="button"
            onKeyDown={() => verifyAndStartQuiz()}
          >
            <Button type="primary" text="Start Practice" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimedPracticeForm;
