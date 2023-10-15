import { FC } from 'react';

import HeroSection from '@components/sections/home/HeroSection';
import InfoSection from '@components/sections/home/InfoSection';
import CurriculumSection from '@components/sections/home/CurriculumSection';
import PricingSection from '@components/sections/home/PricingSection';
import CounterSection from '@components/sections/home/CounterSection';
import TestimonialSection from '@components/sections/home/TestimonialSection';

export interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <>
      <HeroSection />
      <InfoSection />
      <CurriculumSection />
      <PricingSection />
      <CounterSection />
      <TestimonialSection />
    </>
  );
};

export default HomePage;
