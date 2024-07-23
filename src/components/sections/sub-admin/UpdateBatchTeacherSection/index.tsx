import { FC, useState } from 'react';
import { isAxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

import FormButton from '@components/atoms/FormButton';
import ErrorMessage from '@components/atoms/ErrorMessage';
import SuccessMessage from '@components/atoms/SuccessMessage';
import FormSelect, { LabelValuePair } from '@components/atoms/FormSelect';

import { updateBatchTeacherFormSchema } from '@validations/admin';
import { updateBatchTeacherRequest } from '@services/sub-admin';
import { useAuthStore } from '@store/authStore';

import { Teacher } from '@interfaces/apis/teacher';
import { TeacherDetails } from '@interfaces/apis/sub-admin';

import { ERRORS, MESSAGES } from '@constants/app';

export interface UpdateBatchTeacherSectionProps {
  batchId: number;
  batchTeacher: TeacherDetails;
  teachers: Array<Teacher>;
}

const UpdateBatchTeacherSection: FC<UpdateBatchTeacherSectionProps> = ({
  batchId,
  batchTeacher,
  teachers,
}) => {
  const authToken = useAuthStore((state) => state.authToken);
  const navigate = useNavigate();

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const formMethods = useForm({
    resolver: zodResolver(updateBatchTeacherFormSchema),
  });
  const isLoading = formMethods.formState.isSubmitting;

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await updateBatchTeacherRequest(
        batchTeacher?.userId,
        parseInt(data?.teacher, 10),
        batchId,
        authToken!
      );
      if (res.status === 200) {
        setFormError('');
        setFormSuccess(MESSAGES.BATCH_MOVED);
        swal(MESSAGES.BATCH_MOVED, {
          icon: 'success',
        }).then(() => {
          formMethods.reset();
          navigate(0);
        });
      }
    } catch (error) {
      setFormSuccess('');
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400 || status === 401 || status === 403) {
          setFormError(
            error.response?.data?.error ||
              error.response?.data?.message ||
              ERRORS.SERVER_ERROR
          );
        } else {
          setFormError(ERRORS.SERVER_ERROR);
        }
      } else {
        setFormError(ERRORS.SERVER_ERROR);
      }
    }
  };

  const getOptions = (arr: Array<Teacher>, teacherId: number) => {
    const options: LabelValuePair[] = [];
    arr.map((item) => {
      if (item.userId !== teacherId)
        return options.push({
          label: `${item?.firstName} ${item?.lastName}`,
          value: item.userId,
        });
      return options;
    });
    return options;
  };

  return (
    <div className="flex flex-col gap-3 px-6 py-2 justify-evenly tablet:flex-row tablet:justify-between tablet:items-center tablet:p-10 desktop:px-36">
      <div className="flex flex-col w-full gap-10">
        <p className="text-xl font-bold text-gold">Update Batch Teacher</p>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <div className="w-full pb-2 justify-items-center desktop:justify-items-start">
              <p className="py-2">
                <span className="text-white/90">Current Batch Teacher: </span>
                <span className="font-bold">{`${
                  batchTeacher?.firstName || ''
                } ${batchTeacher?.lastName || ''}`}</span>
              </p>
              <FormSelect
                name="teacher"
                placeholder="Select Teacher"
                label="Teacher *"
                width="full"
                options={getOptions(teachers!, batchTeacher?.userId)}
              />
            </div>
            <div className="flex justify-center desktop:justify-start">
              <FormButton
                width="full"
                text="Update Batch"
                isLoading={isLoading}
              />
            </div>
            {formError !== '' ? (
              <div className="flex justify-center text-xl text-center">
                <ErrorMessage errMessage={formError} iconRequired />
              </div>
            ) : null}
            {formSuccess !== '' ? (
              <div className="flex justify-center text-xl text-center">
                <SuccessMessage successMessage={formSuccess} />
              </div>
            ) : null}
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default UpdateBatchTeacherSection;
