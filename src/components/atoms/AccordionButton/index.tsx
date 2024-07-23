import { FC } from 'react';
import { Link } from 'react-router-dom';
import { TiTick } from 'react-icons/ti';
import { ImCross } from 'react-icons/im';
import { FaCheckCircle, FaExclamation } from 'react-icons/fa';

export interface AccordionButtonProps {
  type: 'grey' | 'green' | 'yellow' | 'red';
  text: string;
  link?: string;
  disabled?: boolean;
  withoutIcon?: boolean;
}

const AccordionButton: FC<AccordionButtonProps> = ({
  type,
  text,
  link,
  disabled,
  withoutIcon = false,
}) => {
  return (
    <div className="flex">
      <Link
        to={link || ''}
        className={`${!link && 'cursor-default'} ${
          disabled && 'text-grey cursor-not-allowed'
        }`}
      >
        {type === 'grey' && (
          <div className="min-w-[160px] px-7 py-1 border-2 border-coal rounded-lg flex justify-center items-center gap-2">
            <span className="font-semibold text-md">{text}</span>
            {!withoutIcon && (
              <TiTick className="rounded-full bg-grey text-coal text-md" />
            )}
          </div>
        )}
        {type === 'green' && (
          <div className="min-w-[160px] px-7 py-1 border-2 border-green rounded-lg flex justify-center items-center gap-2">
            <span className="font-semibold text-md">{text}</span>
            {!withoutIcon && (
              <FaCheckCircle className="rounded-full text-green text-md" />
            )}
          </div>
        )}
        {type === 'yellow' && (
          <div className="min-w-[160px] px-7 py-1 border-2 border-gold rounded-lg flex justify-center items-center gap-2">
            <span className="font-semibold text-md">{text}</span>
            {!withoutIcon && (
              <FaExclamation className="rounded-full text-gold text-md" />
            )}
          </div>
        )}
        {type === 'red' && (
          <div className="min-w-[160px] px-7 py-1 border-2 border-red rounded-lg flex justify-center items-center gap-2">
            <span className="font-semibold text-md">{text}</span>
            {!withoutIcon && (
              <ImCross className="rounded-full text-red text-md" />
            )}
          </div>
        )}
      </Link>
    </div>
  );
};

export default AccordionButton;
