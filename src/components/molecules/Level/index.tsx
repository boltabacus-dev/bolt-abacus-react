import { FC, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export interface LevelProps {
  title: string;
  points: string[];
  lastLevel: boolean;
}

const Level: FC<LevelProps> = ({ title, points, lastLevel }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start center', 'end center'],
  });

  const solidHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="relative flex gap-6 desktop:gap-24">
      <div ref={targetRef} className="relative shrink-0 desktop:ml-10">
        <img
          src="/images/dot.png"
          alt=""
          width={100}
          height={100}
          className="w-8 h-8"
        />
        <div className="absolute left-0 flex justify-center w-8 h-full top-2 bottom-2">
          {!lastLevel && (
            <div className="h-full border-l-2 border-dashed border-gold" />
          )}
        </div>
        <div className="absolute left-0 flex justify-center w-8 h-full top-2 bottom-2">
          {!lastLevel && (
            <motion.div
              style={{ height: solidHeight }}
              className="border-l-2 border-gold"
            />
          )}
        </div>
      </div>
      <div className="pt-1 pb-10 pl-4 desktop:pt-0">
        <h2 className="text-lg font-normal text-gold desktop:text-xl">
          {title}
        </h2>
        <div className="pt-2">
          {points.map((point, index) => (
            <li
              key={index}
              className="py-1 ml-3 list-disc text-md tablet:ml-6 desktop:text-lg"
            >
              {point}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Level;
