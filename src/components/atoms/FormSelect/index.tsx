import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import ErrorMessage from '@components/atoms/ErrorMessage';

export interface LabelValuePair {
  label: string;
  value: number | string;
}

export interface FormSelectProps {
  name: string;
  placeholder: string;
  label: string;
  options: Array<LabelValuePair>;
  disabled?: boolean;
  onchange?: (value: string) => void;
  width?: 'fixed' | 'full';
}

const FormSelect: FC<FormSelectProps> = ({
  name,
  label,
  options,
  placeholder,
  width = 'fixed',
  onchange,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div
      className={`flex flex-col py-3 my-4 gap-y-1 desktop:py-2 desktop:my-4 ${
        width === 'fixed'
          ? 'max-w-md w-52 tablet:w-96 desktop:w-80'
          : 'w-full tablet:w-96 desktop:w-full'
      } `}
    >
      <label
        className="font-semibold text-white text-md tablet:text-lg desktop:text-md desktop:font-medium"
        htmlFor={label}
      >
        {label}
      </label>
      <select
        className={`gap-2 px-3 py-2 my-3 text-lg text-white bg-black border-2 border-solid rounded-lg tablet:text-xl desktop:text-lg tablet:px-4 desktop:px-4 tablet:py-3 desktop:py-3 desktop:my-1 focus:outline-none placeholder:text-grey
        ${
          error
            ? 'border-red/50 focus:border-red'
            : 'border-gold/50 focus:border-gold'
        }`}
        {...register(name, {
          onChange: (e) => {
            if (onchange) {
              onchange(e.target.value);
            }
          },
        })}
        {...props}
        id={label}
      >
        <option
          className="max-w-md text-lg tablet:text-xl desktop:text-lg"
          value="-1"
        >
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            className="max-w-md text-lg tablet:text-xl desktop:text-lg"
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error ? <ErrorMessage errMessage={error} iconRequired /> : null}
    </div>
  );
};

export default FormSelect;
