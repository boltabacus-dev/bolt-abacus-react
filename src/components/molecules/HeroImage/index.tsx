import { FC } from 'react';

export interface HeroImageProps {}

const HeroImage: FC<HeroImageProps> = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-4 p-6 w-72 tablet:w-[560px] tablet:gap-8 desktop:gap-12">
      <div className="col-span-1 row-span-2 row-start-2">
        <img
          src="/images/class_four.png"
          alt=""
          height={311}
          width={265}
          className="border rounded-lg shadow-boxGold border-gold"
        />
      </div>
      <div className="col-span-1 row-span-2 row-start-1">
        <img
          src="/images/class_one.png"
          alt=""
          height={311}
          width={265}
          className="border rounded-lg shadow-boxGold border-gold"
        />
      </div>
    </div>
  );
};

export default HeroImage;
