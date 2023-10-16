import { FC } from 'react';
import { ImSpinner8 } from 'react-icons/im';

export interface FormButtonProps {
  text: string;
  isLoading: boolean;
}

const FormButton: FC<FormButtonProps> = ({ text, isLoading }) => {
  return (
    <div className="max-w-md pt-3 desktop:pt-2 w-52 tablet:w-96 desktop:w-80">
      <button
        type="button"
        className={`min-w-full px-3 py-3 my-4 font-semibold text-center text-black rounded-lg bg-gold disabled:bg-gold/30
				${
          !isLoading && 'duration-150 ease-in-out hover:shadow-golden'
        } desktop:mt-4 desktop:px-3 desktop:py-3 desktop:text-md tablet:px-4 tablet:py-4 tablet:text-lg`}
        disabled={isLoading}
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
