import { FC, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

import BrandLogo from '@components/atoms/BrandLogo';
import NavBarLink from '@components/atoms/NavBarLink';
import ProfileIcon from '@components/atoms/ProfileIcon';
import { useAuthStore } from '@store/authStore';
import { HOME_PAGE, PROFILE_PAGE } from '@constants/routes';

export interface StudentNavBarProps {}

const StudentNavBar: FC<StudentNavBarProps> = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const user = useAuthStore((state) => state.user);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="w-full h-24 max-h-24">
      <div className="flex items-center justify-between w-full h-full px-4 tablet:px-10 desktop:px-20">
        <BrandLogo />
        <div>
          <ul className="items-center hidden tablet:flex desktop:flex">
            {user && (
              <NavBarLink type="desktop" href={PROFILE_PAGE}>
                <ProfileIcon
                  text={user.name.first.charAt(0) + user.name.last.charAt(0)}
                />
              </NavBarLink>
            )}
          </ul>
        </div>
        <button
          type="button"
          onClick={handleMenuClick}
          className={`cursor-pointer tablet:hidden desktop:hidden ${
            menuOpen ? 'hidden' : ''
          }`}
        >
          <AiOutlineMenu size={28} className="text-gold" />
        </button>
        <div
          className={`fixed z-[99] w-[100%] h-screen overflow-hidden p-10 top-0 tablet:hidden desktop:hidden bg-black ease-in duration-500
					${menuOpen ? 'left-0' : 'left-[100%] opacity-0'}`}
        >
          <div className="flex items-center justify-end w-full">
            <button
              type="button"
              onClick={handleMenuClick}
              className="cursor-pointer"
            >
              <AiOutlineClose size={28} className="text-gold" />
            </button>
          </div>
          <div className="flex-col">
            <ul>
              <NavBarLink
                type="mobile"
                href={HOME_PAGE}
                onclick={handleMenuClick}
              >
                Home
              </NavBarLink>
              {user && (
                <NavBarLink type="mobile" href={PROFILE_PAGE}>
                  <ProfileIcon
                    text={user.name.first.charAt(0) + user.name.last.charAt(0)}
                  />
                </NavBarLink>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavBar;
