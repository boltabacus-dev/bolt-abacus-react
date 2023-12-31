import { FC } from 'react';

import ErrorMessage from '../ErrorMessage';

export interface LabelValuePair {
  label: string;
  value: number | string;
}

export interface VanillaFormSelectProps {
  name: string;
  placeholder: string;
  label: string;
  value: string | number;
  onchange: (value: string) => void;
  options: Array<LabelValuePair>;
  disabled?: boolean;
  error?: string;
}

const VanillaFormSelect: FC<VanillaFormSelectProps> = ({
  name,
  label,
  options,
  placeholder,
  onchange,
  error,
  ...props
}) => {
  return (
    <div className="flex flex-col max-w-md py-3 my-4 gap-y-1 w-52 desktop:py-2 desktop:my-4 tablet:w-96 desktop:w-80">
      <label
        className="font-semibold text-white text-md tablet:text-lg desktop:text-md desktop:font-medium"
        htmlFor={label}
      >
        {label}
      </label>
      <select
        className="max-w-md gap-2 px-3 py-2 my-3 text-lg text-white bg-black border-2 border-solid rounded-lg border-gold/50 focus:border-gold tablet:text-xl desktop:text-lg tablet:px-4 desktop:px-4 tablet:py-3 desktop:py-3 desktop:my-1 focus:outline-none placeholder:text-grey"
        {...props}
        id={label}
        onChange={(e) => {
          onchange(e.target.value);
        }}
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

export default VanillaFormSelect;
