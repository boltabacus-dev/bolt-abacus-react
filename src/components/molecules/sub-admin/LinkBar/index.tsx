import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import AdminLinkButton from '@components/atoms/AdminLinkButton';

import {
  SUB_ADMIN_ADD_BATCH,
  SUB_ADMIN_ADD_STUDENT,
  SUB_ADMIN_ADD_TEACHER,
  SUB_ADMIN_ALL_BATCH,
  RESET_PASSWORD_PAGE,
} from '@constants/routes';

export interface SubAdminLinkBarProps {}

const SubAdminLinkBar: FC<SubAdminLinkBarProps> = () => {
  const location = useLocation();
  return (
    <div className="hidden py-12 pl-4 tablet:flex">
      <div className="flex flex-col flex-1 gap-3 p-4 text-lg rounded-lg bg-grey">
        <Link to={SUB_ADMIN_ADD_STUDENT}>
          <AdminLinkButton
            text="Add Student"
            active={location.pathname === SUB_ADMIN_ADD_STUDENT}
          />
        </Link>
        <Link to={SUB_ADMIN_ADD_TEACHER}>
          <AdminLinkButton
            text="Add Teacher"
            active={location.pathname === SUB_ADMIN_ADD_TEACHER}
          />
        </Link>
        <Link to={SUB_ADMIN_ALL_BATCH}>
          <AdminLinkButton
            text="View Batches"
            active={location.pathname === SUB_ADMIN_ALL_BATCH}
          />
        </Link>
        <Link to={SUB_ADMIN_ADD_BATCH}>
          <AdminLinkButton
            text="Add Batch"
            active={location.pathname === SUB_ADMIN_ADD_BATCH}
          />
        </Link>
        <Link to={RESET_PASSWORD_PAGE}>
          <AdminLinkButton
            text="Reset Password"
            active={location.pathname === RESET_PASSWORD_PAGE}
          />
        </Link>
      </div>
    </div>
  );
};

export default SubAdminLinkBar;
