import AdminLinkButton from '@components/atoms/AdminLinkButton';
import {
  ADMIN_ADD_BATCH,
  ADMIN_ADD_QUESTION,
  ADMIN_ADD_STUDENT,
  ADMIN_ADD_TEACHER,
  ADMIN_VIEW_QUIZ,
  RESET_PASSWORD_PAGE,
} from '@constants/routes';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
        <Link to={ADMIN_ADD_TEACHER}>
          <AdminLinkButton
            text="Add Teacher"
            active={location.pathname === ADMIN_ADD_TEACHER}
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
