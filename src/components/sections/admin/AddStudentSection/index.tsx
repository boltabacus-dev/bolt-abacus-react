import { FC, useState } from 'react';
import { isAxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import swal from 'sweetalert';

import FormButton from '@components/atoms/FormButton';
import FormInput from '@components/atoms/FormInput';
import ErrorMessage from '@components/atoms/ErrorMessage';
import SuccessMessage from '@components/atoms/SuccessMessage';
import FormSelect, { LabelValuePair } from '@components/atoms/FormSelect';

import { addStudentFormSchema } from '@validations/admin';
import { addStudentRequest } from '@services/student';
import { useAuthStore } from '@store/authStore';

import { Batch } from '@interfaces/apis/batch';
import { ERRORS, MESSAGES } from '@constants/app';

export interface AddStudentSectionProps {
  batches: Array<Batch>;
}

const AddStudentSection: FC<AddStudentSectionProps> = ({ batches }) => {
  const authToken = useAuthStore((state) => state.authToken);

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const formMethods = useForm({
    resolver: zodResolver(addStudentFormSchema),
  });
  const isLoading = formMethods.formState.isSubmitting;

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await addStudentRequest(
        data?.firstName,
        data?.lastName,
        data?.phone,
        parseInt(data?.batch, 10),
        data?.email,
        authToken!
      );
      if (res.status === 200) {
        setFormError('');
        setFormSuccess(MESSAGES.STUDENT_CREATED);
        swal(MESSAGES.STUDENT_CREATED, {
          icon: 'success',
        });

        formMethods.reset();
      }
    } catch (error) {
      setFormSuccess('');
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400 || status === 401) {
          setFormError(error.response?.data?.message);
        } else {
          setFormError(ERRORS.SERVER_ERROR);
        }
      } else {
        setFormError(ERRORS.SERVER_ERROR);
      }
    }
  };

  const getOptions = (arr: Array<Batch>) => {
    const options: LabelValuePair[] = [];
    arr.map((item) => {
      return options.push({
        label: item.batchName,
        value: item.batchId,
      });
    });
    return options;
  };

  return (
    <div className="flex flex-col gap-3 px-6 py-2 justify-evenly tablet:flex-row tablet:justify-between tablet:items-center tablet:p-10 desktop:px-36">
      <div className="flex flex-col w-full gap-10">
        <p className="text-xl font-bold text-gold">Add Student</p>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <div className="grid w-full grid-cols-1 pb-4 justify-items-center desktop:justify-items-start desktop:grid-cols-2">
              <FormInput
                type="text"
                name="firstName"
                placeholder="enter first name"
                label="First Name *"
                disabled={isLoading}
              />
              <FormInput
                type="email"
                name="email"
                placeholder="enter email"
                label="Email Address *"
                disabled={isLoading}
              />
              <FormInput
                type="text"
                name="lastName"
                placeholder="enter last name"
                label="Last Name *"
                disabled={isLoading}
              />
              <FormInput
                type="text"
                name="phone"
                placeholder="enter phone number"
                label="Phone Number *"
                disabled={isLoading}
              />
              <FormSelect
                name="batch"
                placeholder="Select Batch"
                label="Batch *"
                options={getOptions(batches)}
              />
            </div>
            <div className="flex justify-center desktop:justify-start">
              <FormButton text="Add Student" isLoading={isLoading} />
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

export default AddStudentSection;
