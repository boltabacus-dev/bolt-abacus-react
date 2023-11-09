import { FC } from 'react';
import { Link } from 'react-router-dom';
import { TiTick } from 'react-icons/ti';

export interface AccordionButtonProps {
  type: 'grey' | 'green' | 'yellow';
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
        <div className="min-w-[160px] px-7 py-1 border-2 border-coal rounded-lg flex justify-center items-center gap-2">
          {type === 'grey' && (
            <>
              <span className="font-semibold text-md">{text}</span>
              {!withoutIcon && (
                <TiTick className="rounded-full bg-grey text-coal text-md" />
              )}
            </>
          )}
          {type === 'green' && (
            <>
              <span className="font-semibold text-md">{text}</span>
              {!withoutIcon && (
                <TiTick className="rounded-full bg-green text-coal text-md" />
              )}
            </>
          )}
          {type === 'yellow' && (
            <>
              <span className="font-semibold text-md">{text}</span>
              {!withoutIcon && (
                <TiTick className="rounded-full bg-gold text-coal text-md" />
              )}
            </>
          )}
        </div>
      </Link>
    </div>
  );
};

export default AccordionButton;
