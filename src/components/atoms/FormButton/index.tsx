import { FC } from 'react';
import { ImSpinner8 } from 'react-icons/im';

export interface FormButtonProps {
  text: string;
  isLoading: boolean;
  disabled?: boolean;
  width?: 'full' | 'fixed';
}

const FormButton: FC<FormButtonProps> = ({
  text,
  isLoading,
  disabled,
  width = 'fixed',
}) => {
  return (
    <div
      className={`pt-3 desktop:pt-2 ${
        width === 'fixed'
          ? 'max-w-md w-52 tablet:w-96 desktop:w-80'
          : 'w-full tablet:w-96 desktop:w-full'
      } `}
    >
      <button
        type="submit"
        className={`min-w-full cursor-pointer px-3 py-3 my-4 font-semibold text-center text-black rounded-lg bg-gold disabled:bg-gold/30
				${
          !isLoading &&
          !disabled &&
          'duration-150 ease-in-out hover:shadow-golden'
        } desktop:mt-4 desktop:px-3 desktop:py-3 desktop:text-md tablet:px-4 tablet:py-4 tablet:text-lg`}
        disabled={isLoading || disabled}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <ImSpinner8 className="animate-spin" size={24} />
          </div>
        ) : (
          text
        )}
      </button>
    </div>
  );
};

export default FormButton;
