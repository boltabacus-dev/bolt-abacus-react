import { FC } from 'react';

export interface ProfileIconProps {
  text: string;
}

const ProfileIcon: FC<ProfileIconProps> = ({ text }) => {
  return (
    <div className="flex items-center justify-center rounded-full bg-lightBlue h-11 w-11">
      <p className="font-medium text-black uppercase">{text}</p>
    </div>
  );
};

export default ProfileIcon;
