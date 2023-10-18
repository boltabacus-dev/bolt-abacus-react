import { FC } from 'react';

export interface QuizActionButtonProps {
  type: 'skip' | 'next' | 'submit';
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

const QuizActionButton: FC<QuizActionButtonProps> = ({
  type,
  text,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={`w-[160px] px-3 py-2 font-medium text-center rounded-lg text-md tablet:w-[220px] desktop:w-[350px]
      ${disabled && 'cursor-not-allowed'}
		${type === 'skip' ? 'text-white bg-[#0c0c0b] border border-[#E8E8E83B]' : ''}
		${type === 'next' ? 'text-white bg-gold/20 border border-gold/60' : ''}
		${type === 'submit' ? 'text-white bg-gold/20 border border-gold/60' : ''}
		`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default QuizActionButton;
