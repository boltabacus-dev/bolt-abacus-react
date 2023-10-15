import { FC } from 'react';

import Button from '@components/atoms/Button';
import ThunderIcon from '@components/atoms/ThunderIcon';
import HeroImage from '@components/molecules/HeroImage';

import styles from './index.module.css';

export interface HeroSectionProps {}

const HeroSection: FC<HeroSectionProps> = () => {
  return (
    <div
      className={`px-6 flex flex-col justify-evenly items-center desktop:flex-row desktop:px-16 ${styles.heroSection}`}
    >
      <div className="flex flex-col items-center py-6 justify-evenly desktop:items-start">
        <h1 className="w-64 py-4 text-2xl font-bold tablet:text-4xl tablet:w-[460px] desktop:text-5xl desktop:w-fit">
          <span>
            The perfect app to
            <br />
          </span>
          <span className="text-gold">
            learn and master
            <br />
          </span>
          <span className="flex items-center">
            abacus!
            <span className="ml-4">
              <ThunderIcon />
            </span>
          </span>
        </h1>
        <div className="flex gap-2 w-64 tablet:w-[460px] tablet:gap-5 desktop:w-fit desktop:mt-10">
          <a href="#curriculum">
            <div className="w-[120px] desktop:w-[187px]">
              <Button text="Curriculum" type="primary" />
            </div>
          </a>
          <a href="#footer">
            <div className="w-[120px] desktop:w-[187px]">
              <Button text="Contact Us" type="secondary" />
            </div>
          </a>
        </div>
      </div>
      <HeroImage />
    </div>
  );
};

export default HeroSection;
