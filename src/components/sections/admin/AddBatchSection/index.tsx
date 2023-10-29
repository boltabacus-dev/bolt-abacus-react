import { FC, useState } from 'react';
import { isAxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

import FormButton from '@components/atoms/FormButton';
import FormInput from '@components/atoms/FormInput';
import ErrorMessage from '@components/atoms/ErrorMessage';
import SuccessMessage from '@components/atoms/SuccessMessage';
import FormSelect, { LabelValuePair } from '@components/atoms/FormSelect';

import { addBatchRequest } from '@services/batch';
import { useAuthStore } from '@store/authStore';
import { getDayOptions } from '@helpers/batch';

import { addBatchFormSchema } from '@validations/admin';
import { Teacher } from '@interfaces/apis/teacher';
import { ERRORS, MESSAGES } from '@constants/app';

export interface AddBatchSectionProps {
  teachers: Array<Teacher>;
}

const AddBatchSection: FC<AddBatchSectionProps> = ({ teachers }) => {
  const authToken = useAuthStore((state) => state.authToken);

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const formMethods = useForm({
    resolver: zodResolver(addBatchFormSchema),
  });
  const isLoading = formMethods.formState.isSubmitting;

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await addBatchRequest(
        data?.batchName,
        data?.day,
        data?.time,
        parseInt(data?.teacher, 10),
        authToken!
      );
      if (res.status === 200) {
        setFormError('');
        setFormSuccess(MESSAGES.BATCH_CREATED);
        // eslint-disable-next-line no-alert
        alert(MESSAGES.BATCH_CREATED);
        formMethods.reset();
      }
    } catch (error) {
      setFormSuccess('');
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401) {
          setFormError(error.response?.data?.message);
        } else {
          setFormError(ERRORS.SERVER_ERROR);
        }
      } else {
        setFormError(ERRORS.SERVER_ERROR);
      }
    }
  };

  const getOptions = (arr: Array<Teacher>) => {
    const options: LabelValuePair[] = [];
    arr.map((item) => {
      return options.push({
        label: `${item.firstName} ${item.lastName}`,
        value: item.userId,
      });
    });
    return options;
  };

  return (
    <div className="flex flex-col gap-3 px-6 py-2 justify-evenly tablet:flex-row tablet:justify-between tablet:items-center tablet:p-10 desktop:px-36">
      <div className="flex flex-col w-full gap-10">
        <p className="text-xl font-bold text-gold">Create Batch</p>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <div className="grid w-full grid-cols-1 pb-4 justify-items-center desktop:justify-items-start desktop:grid-cols-2">
              <FormInput
                type="text"
                name="batchName"
                placeholder="enter batch name"
                label="Batch Name *"
                disabled={isLoading}
              />
              <FormInput
                type="time"
                name="time"
                placeholder="enter class time"
                label="Class Timings *"
                disabled={isLoading}
              />
              <FormSelect
                name="day"
                placeholder="Select Day"
                label="Day *"
                options={getDayOptions()}
              />
              <FormSelect
                name="teacher"
                placeholder="Select Teacher"
                label="Teacher *"
                options={getOptions(teachers)}
              />
            </div>
            <div className="flex justify-center desktop:justify-start">
              <FormButton text="Create Batch" isLoading={isLoading} />
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

export default AddBatchSection;
