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
import { TagDetails } from '@interfaces/apis/organization';
import { getClassOptions, getLevelOptions } from '@helpers/batch';
import { editTagDetailsRequest } from '@services/organization';
import { editOrganizationFormSchema } from '@validations/admin';
import { ERRORS, MESSAGES } from '@constants/app';

export interface EditOrganizationSectionProps {
  tagDetails: TagDetails;
}

const EditOrganizationSection: FC<EditOrganizationSectionProps> = ({
  tagDetails,
}) => {
  const authToken = useAuthStore((state) => state.authToken);

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const formMethods = useForm({
    resolver: zodResolver(editOrganizationFormSchema),
  });

  const isFormLoading = formMethods.formState.isSubmitting;
  const isFormDataChanged = formMethods.formState.isDirty;

  useEffect(() => {
    formMethods.setValue('tagName', tagDetails.tagName);
    formMethods.setValue('organizationName', tagDetails.organizationName);
    formMethods.setValue('students', tagDetails.totalNumberOfStudents);
    formMethods.setValue('expirationDate', tagDetails.expirationDate);
    formMethods.setValue('class', tagDetails.maxClass);
    formMethods.setValue('level', tagDetails.maxLevel);
  }, [formMethods, tagDetails]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await editTagDetailsRequest(
        data?.organizationName,
        data?.tagName,
        data?.expirationDate,
        data?.level,
        data?.class,
        data?.students,
        tagDetails.numberOfTeachers,
        tagDetails.numberOfStudents,
        tagDetails.isIndividualTeacher,
        authToken!
      );

      if (res.status === 200) {
        setFormError('');
        setFormSuccess(MESSAGES.ORGANIZATION_EDITED);
        swal(MESSAGES.ORGANIZATION_EDITED, {
          icon: 'success',
        });
      }
    } catch (error) {
      setFormSuccess('');
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
        <p className="text-xl font-bold text-gold">Edit Organization</p>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <div className="grid w-full grid-cols-1 pb-4 justify-items-center desktop:justify-items-start desktop:grid-cols-2">
              <FormInput
                type="text"
                name="organizationName"
                placeholder="enter organization name"
                label="Organization Name *"
                disabled={isFormLoading}
              />
              <FormInput
                type="text"
                name="tagName"
                placeholder="enter tag name"
                label="Tag Name *"
                disabled={isFormLoading}
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
                disabled={isFormLoading}
              />
              <FormInput
                type="date"
                name="expirationDate"
                placeholder=""
                label="Expiration Date *"
                disabled={isFormLoading}
              />
            </div>
            <div className="flex justify-center desktop:justify-start">
              <FormButton
                text="Edit Organization"
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

export default EditOrganizationSection;
