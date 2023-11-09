import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';

import BrandLogo from '@components/atoms/BrandLogo';

import { HOME_PAGE } from '@constants/routes';

export interface StudentFooterProps {}

const StudentFooter: FC<StudentFooterProps> = () => {
  return (
    <footer
      id="footer"
      className="w-full p-12 bg-coal tablet:p-10 desktop:py-12 desktop:px-24"
    >
      <div className="flex flex-col tablet:flex-row">
        <div className="py-2 tablet:flex-1">
          <BrandLogo link={HOME_PAGE} />
        </div>
        <div className="flex gap-12 mt-5 tablet:flex-1 desktop:flex-1">
          <div className="flex flex-col flex-1 gap-3 desktop:flex-row desktop:gap-12 desktop:justify-end">
            <a href="/#about">
              <p className="font-medium">About Us</p>
            </a>
            <a href="/#curriculum">
              <p className="font-medium">Curriculum</p>
            </a>
            <a href="#pricing">
              <p className="font-medium">Pricing</p>
            </a>
          </div>
          <div className="flex flex-col gap-3 tablet:flex-1 tablet:flex-row desktop:flex-grow-0 desktop:gap-10">
            <Link
              target="_blank"
              to="https://www.linkedin.com/company/bolt-abacus/"
            >
              <AiFillLinkedin className="text-2xl" />
            </Link>
            <Link target="_blank" to="https://www.instagram.com/bolt_abacus/">
              <AiFillInstagram className="text-2xl" />
            </Link>
          </div>
        </div>
      </div>
      <hr className="my-6 border-grey" />
      <div className="flex flex-col gap-4 text-sm font-semibold text-grey tablet:flex-row">
        <p className="flex-1">
          &copy; All copyrights reserved {new Date().getFullYear()}
        </p>
        <div className="flex flex-col gap-1 tablet:flex-row tablet:gap-5">
          <p>Terms & Conditions</p>
          <p>Privacy</p>
        </div>
      </div>
    </footer>
  );
};

export default StudentFooter;
