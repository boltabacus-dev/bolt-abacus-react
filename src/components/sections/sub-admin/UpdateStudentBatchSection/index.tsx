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

import { updateStudentBatchFormSchema } from '@validations/admin';
import { updateStudentBatchRequest } from '@services/sub-admin';
import { useAuthStore } from '@store/authStore';

import { Batch } from '@interfaces/apis/batch';
import { StudentBatchDetails } from '@interfaces/StudentsFile';
import { ERRORS, MESSAGES } from '@constants/app';

export interface UpdateStudentBatchSectionProps {
  userId: number;
  student: StudentBatchDetails;
  batches: Array<Batch>;
}

const UpdateStudentBatchSection: FC<UpdateStudentBatchSectionProps> = ({
  userId,
  student,
  batches,
}) => {
  const authToken = useAuthStore((state) => state.authToken);
  const navigate = useNavigate();

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const formMethods = useForm({
    resolver: zodResolver(updateStudentBatchFormSchema),
  });
  const isLoading = formMethods.formState.isSubmitting;

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await updateStudentBatchRequest(
        userId,
        parseInt(data?.batch, 10),
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
        if (status === 400 || status === 401) {
          setFormError(
            error.response?.data?.error ||
              error.response?.data?.message ||
              ERRORS.SERVER_ERROR
          );
        } else if (status === 403) {
          swal(error.response?.data?.message || MESSAGES.LIMIT_REACHED, {
            icon: 'error',
          });
          setFormError(MESSAGES.LIMIT_REACHED);
        } else {
          setFormError(ERRORS.SERVER_ERROR);
        }
      } else {
        setFormError(ERRORS.SERVER_ERROR);
      }
    }
  };

  const getOptions = (arr: Array<Batch>, batchId: number) => {
    const options: LabelValuePair[] = [];
    arr.map((item) => {
      if (item.batchId !== batchId)
        return options.push({
          label: item.batchName,
          value: item.batchId,
        });
      return options;
    });
    return options;
  };

  return (
    <div className="flex flex-col gap-3 px-6 py-2 justify-evenly tablet:flex-row tablet:justify-between tablet:items-center tablet:p-10 desktop:px-36">
      <div className="flex flex-col w-full gap-10">
        <p className="text-xl font-bold text-gold">Update Batch</p>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <div className="w-full pb-2 justify-items-center desktop:justify-items-start">
              <p className="py-2">
                <span className="text-white/90">Student Name: </span>
                <span className="font-bold">{`${student.firstName} ${student.lastName}`}</span>
              </p>
              <p className="py-2">
                <span className="text-white/90">Student Email: </span>
                <span className="font-bold">{`${student.email}`}</span>
              </p>
              <p className="py-2">
                <span className="text-white/90">Current Batch: </span>
                <span className="font-bold">{`${student.batchName}`}</span>
              </p>
              <FormSelect
                name="batch"
                placeholder="Select Batch"
                label="Batch *"
                width="full"
                options={getOptions(batches!, student.batchId!)}
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

export default UpdateStudentBatchSection;
