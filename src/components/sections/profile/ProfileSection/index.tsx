import { FC } from 'react';

import { User } from '@interfaces/User';
import Button from '@components/atoms/Button';
import { Link } from 'react-router-dom';
import { RESET_PASSWORD_PAGE } from '@constants/routes';

export interface ProfileSectionProps {
  user: User;
}

const ProfileSection: FC<ProfileSectionProps> = ({ user }) => {
  return (
    <div className="flex flex-col gap-4 px-6 py-2 justify-evenly tablet:flex-row tablet:justify-between tablet:items-center tablet:p-10 desktop:px-24">
      <div className="flex flex-col w-full gap-6">
        <p className="text-lg font-bold text-gold">Profile</p>
        <span>Email: {user.email}</span>
        <span>
          Name: {user.name.first} {user.name.last}
        </span>
        {user.role === 'Student' && <span>Phone: {user.phone}</span>}
        <span>Role: {user.role}</span>
        <Link to={RESET_PASSWORD_PAGE}>
          <Button type="purple" text="Reset Password" />
        </Link>
      </div>
    </div>
  );
};

export default ProfileSection;
