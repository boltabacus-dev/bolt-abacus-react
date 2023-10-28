import AdminLinkButton from '@components/atoms/AdminLinkButton';
import {
  ADMIN_ADD_BATCH,
  ADMIN_ADD_QUESTION,
  ADMIN_ADD_STUDENT,
  ADMIN_ADD_TEACHER,
} from '@constants/routes';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface AdminLinkBarProps {}

const AdminLinkBar: FC<AdminLinkBarProps> = () => {
  const location = useLocation();
  return (
    <div className="pl-4 py-12 hidden tablet:flex">
      <div className="bg-grey rounded-lg p-4 flex flex-col gap-3 flex-1 text-lg">
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
        <Link to={ADMIN_ADD_QUESTION}>
          <AdminLinkButton
            text="Add Question"
            active={location.pathname === ADMIN_ADD_QUESTION}
          />
        </Link>
      </div>
    </div>
  );
};

export default AdminLinkBar;
