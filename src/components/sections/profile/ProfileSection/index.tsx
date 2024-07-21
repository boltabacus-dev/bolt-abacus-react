import { FC } from 'react';
import { isAxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

import Button from '@components/atoms/Button';
import ProfileIcon from '@components/atoms/ProfileIcon';

import { useAuthStore } from '@store/authStore';
import { accountDeletionRequest } from '@services/student';
import { User } from '@interfaces/User';

import { ERRORS } from '@constants/app';
import { HOME_PAGE, RESET_PASSWORD_PAGE } from '@constants/routes';

export interface ProfileSectionProps {
  user: User;
}

const ProfileSection: FC<ProfileSectionProps> = ({ user }) => {
  const authToken = useAuthStore((state) => state.authToken);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const deleteAccount = async () => {
    swal({
      title: 'Are you certain you want to delete your account ?',
      text: `Once deleted you can't access your account anymore.`,
      icon: 'warning',
      buttons: ['Cancel', 'Ok'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await accountDeletionRequest(0, authToken!);
          if (res.status === 200) {
            swal('Account deleted successfully', {
              icon: 'success',
            });
            navigate(HOME_PAGE);
            logout();
          }
        } catch (error) {
          if (isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 401 || status === 403) {
              swal(error.response?.data?.message || ERRORS.SERVER_ERROR, {
                icon: 'error',
              });
            } else {
              swal(ERRORS.SERVER_ERROR, {
                icon: 'error',
              });
            }
          } else {
            swal(ERRORS.SERVER_ERROR, {
              icon: 'error',
            });
          }
        }
      }
    });
  };

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
              <Button type="secondary" text="Reset Password" />
            </Link>
          </div>
          <button
            type="button"
            className="w-full px-3 py-2 font-semibold text-center rounded-lg text-md bg-gold disabled:bg-gold/30 text-black hover:shadow-golden"
            onClick={() => deleteAccount()}
            data-tooltip-id="unlock-class-tooltip"
            data-tooltip-content="Unlock Class"
            data-tooltip-place="bottom"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
