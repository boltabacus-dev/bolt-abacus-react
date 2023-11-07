import { FC } from 'react';

export interface ProfileIconProps {
  text: string;
  size?: 'small' | 'large';
}

const ProfileIcon: FC<ProfileIconProps> = ({ text, size = 'small' }) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-lightBlue ${
        size === 'large' ? 'h-36 w-36' : 'h-11 w-11'
      }`}
    >
      <p
        className={`font-medium text-black uppercase ${
          size === 'large' ? 'text-2xl' : ''
        }`}
      >
        {text}
      </p>
    </div>
  );
};

export default ProfileIcon;
