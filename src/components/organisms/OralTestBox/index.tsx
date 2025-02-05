import {
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';

export interface OralTestBoxProps {
  answer: string;
  questionNumber: number;
  setAnswer: Dispatch<SetStateAction<string>>;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  submitAnswer: () => void;
}

const OralTestBox: FC<OralTestBoxProps> = ({
  answer,
  questionNumber,
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

  return (
    <div className="w-full min-h-[300px] flex justify-center items-center p-2 py-6 bg-darkBlack shadow-boxWhite rounded-2xl">
      <div className="flex flex-col gap-6 items-center w-full text-lg font-bold justify-evenly tablet:text-xl">
        <p className="font-medium text-md tablet:text-lg text-center">
          Please enter answer for question {questionNumber} below
        </p>
        <input
          className="w-28 px-4 py-3 bg-darkBlack outline-none border text-center border-[#A0A0A0] rounded-lg tablet:w-36"
          type="text"
          inputMode="decimal"
          value={answer}
          ref={inputRef}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleEnter(e)}
        />
      </div>
    </div>
  );
};

export default OralTestBox;
