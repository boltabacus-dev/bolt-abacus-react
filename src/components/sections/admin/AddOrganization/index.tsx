import { FC, useState } from 'react';
import { isAxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import swal from 'sweetalert';

import FormButton from '@components/atoms/FormButton';
import FormInput from '@components/atoms/FormInput';
import FormSelect from '@components/atoms/FormSelect';
import ErrorMessage from '@components/atoms/ErrorMessage';
import SuccessMessage from '@components/atoms/SuccessMessage';

import { addTagRequest } from '@services/organization';
import { addOrganizationFormSchema } from '@validations/admin';
import { getClassOptions, getLevelOptions } from '@helpers/batch';
import { useAuthStore } from '@store/authStore';
import { ERRORS, MESSAGES } from '@constants/app';

export interface AddOrganizationSectionProps {}

const AddOrganizationSection: FC<AddOrganizationSectionProps> = () => {
  const authToken = useAuthStore((state) => state.authToken);

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const formMethods = useForm({
    resolver: zodResolver(addOrganizationFormSchema),
  });
  const isLoading = formMethods.formState.isSubmitting;

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await addTagRequest(
        data?.organizationName,
        data?.tagName,
        data?.expirationDate,
        data?.level,
        data?.class,
        data?.students,
        authToken!,
        0,
        0,
        false
      );
      if (res.status === 200) {
        setFormError('');
        setFormSuccess(MESSAGES.ORGANIZATION_CREATED);
        swal(MESSAGES.ORGANIZATION_CREATED, {
          icon: 'success',
        });
        formMethods.reset();
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
        } else {
          setFormError(ERRORS.SERVER_ERROR);
        }
      } else {
        setFormError(ERRORS.SERVER_ERROR);
      }
    }
    setFormError('');
    setFormSuccess('');
  };

  return (
    <div className="flex flex-col gap-3 px-6 py-2 justify-evenly tablet:flex-row tablet:justify-between tablet:items-center tablet:p-10 desktop:px-36">
      <div className="flex flex-col w-full gap-10">
        <p className="text-xl font-bold text-gold">Create Organization</p>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <div className="grid w-full grid-cols-1 pb-4 justify-items-center desktop:justify-items-start desktop:grid-cols-2">
              <FormInput
                type="text"
                name="organizationName"
                placeholder="enter organization name"
                label="Organization Name *"
                disabled={isLoading}
              />
              <FormInput
                type="text"
                name="tagName"
                placeholder="enter tag name"
                label="Tag Name *"
                disabled={isLoading}
              />
              <FormSelect
                name="level"
                placeholder="Select Level"
                label="Level *"
                options={getLevelOptions()}
              />
              <FormSelect
                name="class"
                placeholder="Select Class"
                label="Class *"
                options={getClassOptions()}
              />
              <FormInput
                type="number"
                name="students"
                placeholder="1000"
                label="Total Number of Students *"
                disabled={isLoading}
              />
              <FormInput
                type="date"
                name="expirationDate"
                placeholder=""
                label="Expiration Date *"
                disabled={isLoading}
              />
            </div>
            <div className="flex justify-center desktop:justify-start">
              <FormButton text="Create Organization" isLoading={isLoading} />
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

export default AddOrganizationSection;
