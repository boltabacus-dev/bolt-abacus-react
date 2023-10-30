import { FC } from 'react';

import PricingCard from '@components/molecules/PricingCard';

import { pricingPlans } from '@constants/pricingSectionDetails';

export interface PricingSectionProps {}

const PricingSection: FC<PricingSectionProps> = () => {
  return (
    <div
      id="pricing"
      className="p-12 py-5 tablet:p-10 tablet:py-6 desktop:py-8 desktop:px-24"
    >
      <h1 className="pt-2 text-xl font-bold text-center text-gold desktop:text-2xl">
        Pricing
      </h1>
      <div className="grid grid-cols-1 gap-12 py-10 mx-auto mt-10 tablet:py-16 tablet:grid-cols-3 desktop:grid-cols-3">
        {pricingPlans.map((plan, index) => (
          <PricingCard key={index} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
