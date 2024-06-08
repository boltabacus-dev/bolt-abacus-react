import { FC } from 'react';
import { isAxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { AiFillUnlock, AiOutlineLink } from 'react-icons/ai';
import { MdPeople } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';
import swal from 'sweetalert';

import { useAuthStore } from '@store/authStore';
import { updateClassRequest } from '@services/teacher';
import { UpdateClassResponse } from '@interfaces/apis/teacher';

import {
  TEACHER_BATCH_REPORT,
  TEACHER_STUDENTS,
  TEACHER_UPDATE_LINK,
} from '@constants/routes';
import { ERRORS } from '@constants/app';
import { BiSolidReport } from 'react-icons/bi';

export interface BatchCardProps {
  batchName: string;
  batchId: number;
  timings: string;
  bgColor: string;
}

const BatchCard: FC<BatchCardProps> = ({
  batchId,
  batchName,
  timings,
  bgColor,
}) => {
  const authToken = useAuthStore((state) => state.authToken);

  const updateClass = async () => {
    swal({
      title: 'Are you certain you want to update the class ?',
      text: 'After moving to the next class, you will not be able to return to the previous class.',
      icon: 'warning',
      buttons: ['Cancel', 'Ok'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await updateClassRequest(batchId, authToken!);
          if (res.status === 200) {
            const updateClassResponse: UpdateClassResponse = res.data;
            swal(
              `Batch moved to Level: ${updateClassResponse.level} & Class: ${updateClassResponse.class}`,
              {
                icon: 'success',
              }
            );
          }
        } catch (error) {
          if (isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 401 || status === 403) {
              swal(error.response?.data?.message, {
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
    <div
      className={`min-h-[180px] flex flex-col justify-center gap-4 p-3 rounded-xl w-fit tablet:min-w-[150px] ${bgColor}`}
    >
      <p className="font-semibold text-left text-white">{batchName}</p>
      <div className="grid grid-cols-3 gap-2">
        <Link
          to={`${TEACHER_UPDATE_LINK}/${batchId}`}
          data-tooltip-id="update-link-tooltip"
          data-tooltip-content="Update Zoom Link"
          data-tooltip-place="bottom"
        >
          <button type="button" className="p-2 text-black bg-white rounded">
            <AiOutlineLink />
          </button>
        </Link>
        <Tooltip id="update-link-tooltip" />

        <Link
          to={`${TEACHER_STUDENTS}/${batchId}`}
          data-tooltip-id="batch-students-tooltip"
          data-tooltip-content="View Students"
          data-tooltip-place="bottom"
        >
          <button type="button" className="p-2 text-black bg-white rounded">
            <MdPeople />
          </button>
        </Link>
        <Tooltip id="batch-students-tooltip" />

        <Link
          to={`${TEACHER_BATCH_REPORT}/${batchId}`}
          data-tooltip-id="batch-report-tooltip"
          data-tooltip-content="View Batch Report"
          data-tooltip-place="bottom"
        >
          <button type="button" className="p-2 text-black bg-white rounded">
            <BiSolidReport />
          </button>
        </Link>
        <Tooltip id="batch-report-tooltip" />

        <button
          type="button"
          className="p-2 text-white bg-black rounded col-span-3 flex items-center justify-center"
          onClick={() => updateClass()}
          data-tooltip-id="unlock-class-tooltip"
          data-tooltip-content="Unlock Class"
          data-tooltip-place="bottom"
        >
          <AiFillUnlock />
        </button>
        <Tooltip id="unlock-class-tooltip" />
      </div>
      <p className="pt-2 text-left text-white">{timings}</p>
    </div>
  );
};

export default BatchCard;
