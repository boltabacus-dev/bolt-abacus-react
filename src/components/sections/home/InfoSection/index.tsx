import { FC } from 'react';
import {
  MdOutlineAccountCircle,
  MdOutlineCelebration,
  MdOutlineVisibility,
} from 'react-icons/md';

import InfoCard from '@components/molecules/InfoCard';

import {
  aboutUsDescription,
  learnWithFunDescription,
  ourInnovationDescription,
} from '@constants/infoSectionDetails';

export interface InfoSectionProps {}

const InfoSection: FC<InfoSectionProps> = () => {
  return (
    <div id="about" className="p-12 tablet:p-10 desktop:py-12 desktop:px-24">
      <div className="grid grid-cols-1 gap-12 py-16 mx-auto tablet:grid-cols-3 tablet:gap-6 desktop:grid-cols-3 desktop:gap-16">
        <InfoCard
          type="primary"
          icon={<MdOutlineAccountCircle />}
          title="About Us"
          description={aboutUsDescription}
        />
        <InfoCard
          type="secondary"
          icon={<MdOutlineVisibility />}
          title="Our Innovation"
          description={ourInnovationDescription}
        />
        <InfoCard
          type="primary"
          icon={<MdOutlineCelebration />}
          title="Learn with fun"
          description={learnWithFunDescription}
        />
      </div>
    </div>
  );
};

export default InfoSection;
