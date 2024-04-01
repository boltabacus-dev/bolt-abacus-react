import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import ErrorMessage from '@components/atoms/ErrorMessage';

export interface FormInputProps {
  type: 'text' | 'email' | 'password' | 'number' | 'time' | 'file';
  name: string;
  placeholder: string;
  label: string;
  hasError?: boolean;
  disabled?: boolean;
  showPassword?: boolean;
  accept?: string;
}

const FormInput: FC<FormInputProps> = ({
  name,
  label,
  hasError,
  type,
  showPassword = false,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col max-w-md py-3 my-4 gap-y-1 w-52 desktop:py-2 desktop:my-4 tablet:w-96 desktop:w-80">
      <label
        className="font-semibold text-white text-md tablet:text-lg desktop:text-md desktop:font-medium"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        className={`min-w-full px-3 py-2 my-3 tablet:text-xl desktop:text-lg tablet:px-4 desktop:px-4 tablet:py-3 desktop:py-3 desktop:my-1 text-lg focus:outline-none placeholder:text-grey border-2 border-solid rounded-lg text-white bg-black
        ${
          error || hasError
            ? 'border-red/50 focus:border-red'
            : 'border-gold/50 focus:border-gold'
        }`}
        {...register(name)}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        {...props}
        id={label}
      />
      {error ? <ErrorMessage errMessage={error} iconRequired /> : null}
    </div>
  );
};

export default FormInput;
