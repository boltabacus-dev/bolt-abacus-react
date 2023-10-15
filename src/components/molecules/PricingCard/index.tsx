import { FC } from 'react';
import { BiCheck } from 'react-icons/bi';

import { pricingPlans } from '@constants/pricingSectionDetails';

import styles from './index.module.css';

export interface PricingCardProps {
  plan: (typeof pricingPlans)[0];
}

const PricingCard: FC<PricingCardProps> = ({ plan }) => {
  return (
    <div
      className={`relative flex flex-col border border-gold ${
        styles.pricingCard
      }
      ${plan.mostPopular ? 'rounded-b-2xl mt-10 tablet:mt-0 ' : 'rounded-2xl'}
      `}
    >
      {plan.mostPopular && (
        <div className="absolute top-0 w-[100.5%] -left-[0.25%] p-2 text-sm font-bold text-center text-black -translate-y-full rounded-t-2xl bg-green tablet:text-xs">
          Most Popular
        </div>
      )}
      <div className="flex flex-col p-8 desktop:p-12 tablet:px-4">
        <div className="flex flex-col items-center justify-center gap-5 text-center">
          <div className="w-40 p-3 px-4 text-sm font-semibold text-black rounded-lg bg-gold tablet:w-28 tablet:py-2 desktop:w-60 desktop:py-3">
            {plan.title}
          </div>
          <p className="font-semibold text-md">{plan.description}</p>
          <div className="">
            <div className="flex items-start text-sm font-semibold">
              <span className="p-1.5 font-medium text-lg">{plan.symbol}</span>
              <div className="flex items-center">
                <span className="text-3xl">{plan.price}</span>
                <span className="mt-3 ml-2 text-grey">{plan.frequency}</span>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-grey mt-7" />
        <ul className="flex-1 mt-6 space-y-4">
          {plan.features.map((feature) => (
            <li key={feature} className="flex text-sm">
              <BiCheck className="text-xl shrink-0 text-gold" />
              <span className="ml-3">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-8 font-semibold text-center text-gold tablet:text-md desktop:text-lg">
          Payable {plan.total} {plan.currency} <br /> EMI Available*
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
