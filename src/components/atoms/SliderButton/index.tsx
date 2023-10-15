import { FC, MouseEventHandler } from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

export interface SliderButtonProps {
  onClick: MouseEventHandler;
  isPrev: boolean;
}

const SliderButton: FC<SliderButtonProps> = ({ onClick, isPrev }) => {
  return (
    <button
      type="button"
      className={`absolute items-center justify-center hidden w-20 h-20 text-black -translate-y-1/2 bg-white rounded-full tablet:flex tablet:w-14 tablet:h-14 top-1/2
				${isPrev ? 'left-0' : 'right-0'}
			`}
      onClick={onClick}
    >
      {isPrev ? (
        <HiArrowLeft className="text-2xl tablet:text-xl" />
      ) : (
        <HiArrowRight className="text-2xl tablet:text-xl" />
      )}
    </button>
  );
};

export default SliderButton;
