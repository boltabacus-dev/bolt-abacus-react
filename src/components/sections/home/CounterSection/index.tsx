import { FC } from 'react';

import CounterCard from '@components/atoms/CounterCard';

export interface CounterSectionProps {}

const CounterSection: FC<CounterSectionProps> = () => {
  return (
    <div className="p-12 py-5 tablet:p-10 tablet:py-6 desktop:py-8 desktop:px-24">
      <div className="grid grid-cols-1 gap-12 py-16 mx-auto tablet:grid-cols-3 desktop:grid-cols-3">
        <CounterCard category="Mathematicians Created" from={0} to={100} />
        <CounterCard category="Hours Taught" from={0} to={2000} />
        <CounterCard
          category="Communities and Schools partnered"
          from={0}
          to={5}
        />
      </div>
    </div>
  );
};

export default CounterSection;
