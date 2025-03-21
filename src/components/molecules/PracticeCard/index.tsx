import { FC } from 'react';
import { Link } from 'react-router-dom';

export interface PracticeCardProps {
  title: string;
  image: string;
  description: string;
  link: string;
  color: 'blue' | 'green' | 'pink' | 'red';
}

const PracticeCard: FC<PracticeCardProps> = ({
  title,
  image,
  description,
  link,
  color,
}) => {
  return (
    <Link
      to={link}
      className={`tablet:gap-6 flex flex-col justify-center items-center gap-4 bg-card p-4 rounded-lg w-full text-black text-lg ${color === 'blue' && 'bg-orange/60'} ${color === 'green' && 'bg-green/60'} ${color === 'pink' && 'bg-purple/60'} ${color === 'red' && 'bg-red/50'}`}
    >
      <img
        src={image}
        alt="flashcards"
        className="tablet:h-40 h-32 object-cover text-center"
      />
      <h2 className="font-bold text-black text-md tablet:text-lg">{title}</h2>
      <p className="tablet:text-md flex-1 w-full text-black text-sm text-justify">
        {description}
      </p>
    </Link>
  );
};

export default PracticeCard;
