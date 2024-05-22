import { FC } from 'react';
import { Link } from 'react-router-dom';

import Button from '@components/atoms/Button';
import ProfileIcon from '@components/atoms/ProfileIcon';

import { User } from '@interfaces/User';
import { RESET_PASSWORD_PAGE } from '@constants/routes';

export interface ProfileSectionProps {
  user: User;
}

const ProfileSection: FC<ProfileSectionProps> = ({ user }) => {
  return (
    <div className="flex items-center gap-4 py-2 justify-evenly">
      <div className="flex flex-col gap-8 px-6 py-10 bg-darkBlack tablet:px-16 rounded-xl shadow-boxWhite">
        <div className="flex items-center justify-center p-4">
          <ProfileIcon
            text={user.name.first.charAt(0) + user.name.last.charAt(0)}
            size="large"
          />
        </div>
        <div className="flex flex-col gap-6 tablet:text-lg">
          <div className="flex items-center gap-2">
            <div className="font-semibold text-gold/75">Name: </div>
            <div className="">
              {user.name.first} {user.name.last}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-semibold text-gold/75">Phone: </div>
            <div className="">{user.phone}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-semibold text-gold/75">Email: </div>
            <div className="">{user.email}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-semibold text-gold/75">Role: </div>
            <div className="">{user.role}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-semibold text-gold/75">Organization: </div>
            <div className="">{user.organizationName}</div>
          </div>
          <div className="w-full pt-4">
            <Link to={RESET_PASSWORD_PAGE}>
              <Button type="primary" text="Reset Password" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
