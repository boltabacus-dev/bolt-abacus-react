import Button from '@components/atoms/Button';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export interface PracticeCardProps {
  title: string;
  image: string;
  description: string;
  link: string;
}

const PracticeCard: FC<PracticeCardProps> = ({
  title,
  image,
  description,
  link,
}) => {
  return (
    <div className="tablet:gap-6 flex flex-col justify-center items-center gap-4 bg-white p-4 rounded-md w-full text-black text-lg">
      <img
        src={image}
        alt="flashcards"
        className="tablet:h-40 h-32 object-cover text-center"
      />
      <h2 className="font-bold text-black text-md tablet:text-lg">{title}</h2>
      <p className="tablet:text-md flex-1 w-full text-darkGrey text-sm text-justify">
        {description}
      </p>
      <Link to={link} className="w-full">
        <Button type="blackWhite" text="Start Now" />
      </Link>
    </div>
  );
};

export default PracticeCard;
