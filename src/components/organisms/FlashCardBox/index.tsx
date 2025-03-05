import {
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import { QuizQuestion } from '@interfaces/apis/student';

export interface FlashCardBoxProps {
  speed: number;
  quizQuestion: QuizQuestion;
  answer: string;
  setAnswer: Dispatch<SetStateAction<string>>;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  submitAnswer: () => void;
}

const FlashCardBox: FC<FlashCardBoxProps> = ({
  speed,
  quizQuestion,
  answer,
  setAnswer,
  setDisabled,
  submitAnswer,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const result = event.target.value.replace(/[^0-9-]/gi, '');
    setAnswer(result);

    const num = parseInt(result, 10);
    if (Number.isNaN(num)) setDisabled(true);
    else setDisabled(false);
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      submitAnswer();
    }
  };

  useEffect(() => {
    inputRef?.current?.focus();
  });

  const [currentNumber, setCurrentNumber] = useState(
    quizQuestion.question.numbers[0]
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
    setCurrentNumber(quizQuestion.question.numbers[0]);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex < quizQuestion.question.numbers.length) {
          setCurrentNumber(quizQuestion.question.numbers[nextIndex]);
          return nextIndex;
        }
        clearInterval(interval);
        return prevIndex;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [quizQuestion, speed]);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 50);
  }, [currentNumber]);

  return (
    <div className="flex justify-center items-center bg-darkBlack shadow-boxWhite p-2 py-6 rounded-2xl w-full min-h-[300px]">
      <div className="flex justify-evenly items-center w-full font-bold text-lg tablet:text-xl">
        <div className="flex flex-col">
          <div className="tablet:gap-10 flex items-center gap-4">
            <div className="flex flex-col items-end gap-1 tracking-widest">
              <div
                key={currentIndex}
                className={`p-4 border-2 border-gold rounded-lg font-bold text-gold text-3xl
                            ${animate ? 'animate-fadeIn' : 'opacity-0'}`}
              >
                <p>{currentNumber}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-gold text-2xl desktop:text-3xl"> = </div>
        <div className="">
          <input
            className="tablet:w-36 bg-darkBlack px-4 py-3 border border-[#A0A0A0] rounded-lg outline-none w-28 text-center"
            type="text"
            inputMode="decimal"
            value={answer}
            ref={inputRef}
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => handleEnter(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default FlashCardBox;
