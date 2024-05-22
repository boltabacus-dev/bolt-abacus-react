import { FC } from 'react';
import { Link } from 'react-router-dom';

import Button from '@components/atoms/Button';

import { TagDetails } from '@interfaces/apis/organization';

import { ADMIN_EDIT_ORGANIZATION } from '@constants/routes';

export interface OrganizationCardProps {
  tagDetails: TagDetails;
}

const OrganizationCard: FC<OrganizationCardProps> = ({ tagDetails }) => {
  return (
    <div className="flex items-center gap-4 py-2 justify-evenly">
      <div className="flex flex-col gap-8 px-6 py-10 bg-darkBlack tablet:px-16 rounded-xl shadow-boxWhite">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="font-semibold text-gold/75">Tag Name: </div>
            <div className="">{tagDetails.tagName}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-semibold text-gold/75">
              Organization Name:{' '}
            </div>
            <div className="">{tagDetails.organizationName}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-semibold text-gold/75">
              Number of Students:{' '}
            </div>
            <div className="">
              {tagDetails.numberOfStudents} / {tagDetails.totalNumberOfStudents}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-semibold text-gold/75">
              Number of Teachers:{' '}
            </div>
            <div className="">{tagDetails.numberOfTeachers}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-semibold text-gold/75">Max Level: </div>
            <div className="">{tagDetails.maxLevel}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-semibold text-gold/75">Max Class: </div>
            <div className="">{tagDetails.maxClass}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-semibold text-gold/75">Expiration Date: </div>
            <div className="">
              {tagDetails.expirationDate}{' '}
              <span className="text-sm">(YYYY-MM-DD)</span>
            </div>
          </div>
          <div className="w-full pt-4">
            <Link
              target="_blank"
              to={`${ADMIN_EDIT_ORGANIZATION}/${tagDetails.tagName}`}
            >
              <Button type="secondary" text="Edit Details" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationCard;
