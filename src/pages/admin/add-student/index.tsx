/* eslint-disable no-console */

import { FC } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import SeoComponent from '@components/atoms/SeoComponent';
import FormInput from '@components/atoms/FormInput';
import FormButton from '@components/atoms/FormButton';

import { addStudentFormSchema } from '@validations/admin';

export interface AdminAddStudentPageProps {}

const AdminAddStudentPage: FC<AdminAddStudentPageProps> = () => {
  const formMethods = useForm({
    resolver: zodResolver(addStudentFormSchema),
  });
  const isLoading = formMethods.formState.isSubmitting;

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
  };

  return (
    <>
      <SeoComponent title="Add Student" />
      <div className="flex flex-col gap-4 px-6 py-2 justify-evenly tablet:flex-row tablet:justify-between tablet:items-center tablet:p-10 desktop:px-36">
        <div className="flex flex-col w-full gap-10">
          <p className="text-xl font-bold text-gold">Add Student</p>
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <div className="grid w-full grid-cols-2 pb-4 align-middle origin-center">
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

                <FormInput
                  type="number"
                  name="batch"
                  placeholder="enter batch number"
                  label="Phone Number *"
                  disabled={isLoading}
                />
              </div>
              <FormButton text="Add Student" isLoading={isLoading} />
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
};

export default AdminAddStudentPage;
