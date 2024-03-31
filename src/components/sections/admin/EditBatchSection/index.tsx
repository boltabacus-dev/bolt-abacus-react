import { FC, useEffect, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import swal from 'sweetalert';

import FormInput from '@components/atoms/FormInput';
import FormSelect from '@components/atoms/FormSelect';
import FormButton from '@components/atoms/FormButton';
import ErrorMessage from '@components/atoms/ErrorMessage';
import SuccessMessage from '@components/atoms/SuccessMessage';

import { useAuthStore } from '@store/authStore';
import { Batch } from '@interfaces/apis/batch';
import { getDayOptions } from '@helpers/batch';
import { editBatchRequest } from '@services/batch';

import { ERRORS, MESSAGES } from '@constants/app';
import { editBatchSchema } from '@validations/admin';

export interface EditBatchSectionProps {
  batch: Batch;
}

const EditBatchSection: FC<EditBatchSectionProps> = ({ batch }) => {
  const authToken = useAuthStore((state) => state.authToken);

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const formMethods = useForm({
    resolver: zodResolver(editBatchSchema),
  });

  const isFormLoading = formMethods.formState.isSubmitting;
  const isFormDataChanged = formMethods.formState.isDirty;

  useEffect(() => {
    formMethods.setValue('batchName', batch.batchName);
    formMethods.setValue('timeDay', batch.timeDay);
    const time24 = new Date(
      `2000-01-01 ${batch.timeSchedule}`
    ).toLocaleTimeString('en-US', { hour12: false });

    formMethods.setValue('timeSchedule', time24);
  }, [formMethods, batch]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await editBatchRequest(
        batch.batchId,
        data?.batchName,
        data?.timeDay,
        data?.timeSchedule,
        batch.numberOfStudents,
        batch.active,
        batch.latestLevelId,
        batch.latestClassId,
        authToken!
      );

      if (res.status === 200) {
        setFormError('');
        setFormSuccess(MESSAGES.BATCH_EDITED);
        swal(MESSAGES.BATCH_EDITED, {
          icon: 'success',
        });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
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

  return (
    <div className="flex flex-col gap-10 px-6 py-2 justify-evenly tablet:justify-between tablet:items-center tablet:p-10 desktop:px-36">
      <div className="flex flex-col w-full gap-10">
        <p className="text-xl font-bold text-gold">Edit Batch</p>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <div className="grid w-full grid-cols-1 pb-4 justify-items-center desktop:justify-items-start desktop:grid-cols-2">
              <FormInput
                type="text"
                name="batchName"
                placeholder="enter batch name"
                label="Batch Name *"
                disabled={isFormLoading}
              />
              <FormInput
                type="time"
                name="timeSchedule"
                placeholder="enter class time"
                label="Class Timings *"
                disabled={isFormLoading}
              />
              <FormSelect
                name="timeDay"
                placeholder="Select Day"
                label="Day *"
                options={getDayOptions()}
              />
            </div>
            <div className="flex justify-center desktop:justify-start">
              <FormButton
                text="Edit Batch"
                isLoading={isFormLoading}
                disabled={!isFormDataChanged}
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

export default EditBatchSection;
