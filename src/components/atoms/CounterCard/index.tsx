/* eslint-disable consistent-return */
import { FC, useState, useEffect, useRef } from 'react';

import { animate, motion } from 'framer-motion';

import styles from './index.module.css';

export interface CounterCardProps {
  from: number;
  to: number;
  category: string;
}

const CounterCard: FC<CounterCardProps> = ({ from, to, category }) => {
  const nodeRef = useRef<HTMLParagraphElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration: 4,
      onUpdate(value) {
        node.textContent = Math.round(value).toString();
      },
    });

    return () => controls.stop();
  }, [from, to, isInView]);

  return (
    <div
      className={`flex justify-start gap-2 p-8 h-32 desktop:h-36 desktop:p-12 tablet:px-4  text-center border border-gold rounded-xl ${styles.counterCard}`}
    >
      <div className="flex items-center justify-center w-2/6 p-2 text-sm font-semibold text-gold tablet:text-md desktop:text-lg">
        <motion.p ref={nodeRef} /> +
      </div>
      <div className="flex items-center w-4/6 p-2 font-semibold text-left text-md tablet:text-sm desktop:text-lg">
        {category}
      </div>
    </div>
  );
};

export default CounterCard;
