import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import AdminLinkButton from '@components/atoms/AdminLinkButton';

import {
  ADMIN_ADD_BATCH,
  ADMIN_ADD_ORGANIZATION,
  ADMIN_ADD_QUESTION,
  ADMIN_ADD_STUDENT,
  ADMIN_ADD_TEACHER,
  ADMIN_ALL_BATCH,
  ADMIN_BULK_ADD_QUESTION,
  ADMIN_SUB_ADMIN_TEACHER,
  ADMIN_VIEW_ORGANIZATION,
  ADMIN_VIEW_QUIZ,
  ADMIN_BULK_ADD_STUDENT,
  RESET_PASSWORD_PAGE,
  ADMIN_ALL_TEACHER,
  ADMIN_SEARCH_STUDENT,
} from '@constants/routes';

export interface AdminLinkBarProps {}

const AdminLinkBar: FC<AdminLinkBarProps> = () => {
  const location = useLocation();
  return (
    <div className="hidden py-12 pl-4 tablet:flex">
      <div className="flex flex-col flex-1 gap-3 p-4 text-lg rounded-lg bg-grey">
        <Link to={ADMIN_ADD_STUDENT}>
          <AdminLinkButton
            text="Add Student"
            active={location.pathname === ADMIN_ADD_STUDENT}
          />
        </Link>
        <Link to={ADMIN_BULK_ADD_STUDENT}>
          <AdminLinkButton
            text="Bulk Add Student"
            active={location.pathname === ADMIN_BULK_ADD_STUDENT}
          />
        </Link>
        <Link to={ADMIN_SEARCH_STUDENT}>
          <AdminLinkButton
            text="Search Student"
            active={location.pathname === ADMIN_SEARCH_STUDENT}
          />
        </Link>
        <Link to={ADMIN_ALL_TEACHER}>
          <AdminLinkButton
            text="View Teachers"
            active={location.pathname === ADMIN_ALL_TEACHER}
          />
        </Link>
        <Link to={ADMIN_ADD_TEACHER}>
          <AdminLinkButton
            text="Add Teacher"
            active={location.pathname === ADMIN_ADD_TEACHER}
          />
        </Link>
        <Link to={ADMIN_VIEW_ORGANIZATION}>
          <AdminLinkButton
            text="View Organization"
            active={location.pathname === ADMIN_VIEW_ORGANIZATION}
          />
        </Link>
        <Link to={ADMIN_ADD_ORGANIZATION}>
          <AdminLinkButton
            text="Add Organization"
            active={location.pathname === ADMIN_ADD_ORGANIZATION}
          />
        </Link>
        <Link to={ADMIN_SUB_ADMIN_TEACHER}>
          <AdminLinkButton
            text="Add Sub Admin"
            active={location.pathname === ADMIN_SUB_ADMIN_TEACHER}
          />
        </Link>
        <Link to={ADMIN_ALL_BATCH}>
          <AdminLinkButton
            text="View Batches"
            active={location.pathname === ADMIN_ALL_BATCH}
          />
        </Link>
        <Link to={ADMIN_ADD_BATCH}>
          <AdminLinkButton
            text="Add Batch"
            active={location.pathname === ADMIN_ADD_BATCH}
          />
        </Link>
        <Link to={ADMIN_VIEW_QUIZ}>
          <AdminLinkButton
            text="View Quiz"
            active={location.pathname === ADMIN_VIEW_QUIZ}
          />
        </Link>
        <Link to={ADMIN_ADD_QUESTION}>
          <AdminLinkButton
            text="Add Question"
            active={location.pathname === ADMIN_ADD_QUESTION}
          />
        </Link>
        <Link to={ADMIN_BULK_ADD_QUESTION}>
          <AdminLinkButton
            text="Bulk Add Questions"
            active={location.pathname === ADMIN_BULK_ADD_QUESTION}
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

export default AdminLinkBar;
