import { FC, ReactNode } from 'react';
import { ImSpinner8 } from 'react-icons/im';

export interface ButtonProps {
  type:
    | 'primary'
    | 'secondary'
    | 'active'
    | 'purple'
    | 'blue'
    | 'black'
    | 'blackWhite';
  text: string;
  isLoading?: boolean;
  children?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  type,
  text,
  isLoading = false,
  children,
}) => {
  return (
    <button
      type="button"
      className={`w-full px-3 py-2 font-semibold text-center rounded-lg text-md
				${!isLoading ? 'duration-150 ease-in-out' : ''}
				${
          type === 'primary'
            ? 'bg-gold disabled:bg-gold/30 text-black hover:shadow-golden'
            : ''
        }
				${
          type === 'secondary'
            ? 'bg-black text-white border border-gold hover:shadow-golden'
            : ''
        }
				${type === 'active' ? 'bg-gold text-black shadow-golden' : ''}
				${type === 'purple' ? 'bg-purple text-black hover:shadow-purpled' : ''}
				${type === 'blue' ? 'bg-blue text-white hover:shadow-blued' : ''}
				${type === 'black' ? 'text-gold border-2 border-gold' : ''}
				${type === 'blackWhite' ? 'text-white bg-black hover:shadow-black' : ''}
				`}
      disabled={isLoading}
    >
      {isLoading && <ImSpinner8 className="animate-spin" size={24} />}
      {!isLoading && !children && <span>{text}</span>}
      {!isLoading && children && <span className="">{children}</span>}
    </button>
  );
};

export default Button;
