import { isAxiosError } from 'axios';
import { FC, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import FormInput from '@components/atoms/FormInput';
import FormButton from '@components/atoms/FormButton';
import ErrorMessage from '@components/atoms/ErrorMessage';
import SuccessMessage from '@components/atoms/SuccessMessage';

import { updateBatchLink } from '@services/teacher';
import { useAuthStore } from '@store/authStore';

import { updateBatchLinkSchema } from '@validations/teacher';
import { ERRORS, MESSAGES } from '@constants/app';
import { useNavigate } from 'react-router-dom';
import { TEACHER_DASHBOARD } from '@constants/routes';

export interface TeacherUpdateLinkSectionProps {
  batchId: number;
}

const TeacherUpdateLinkSection: FC<TeacherUpdateLinkSectionProps> = ({
  batchId,
}) => {
  const authToken = useAuthStore((state) => state.authToken);
  const navigate = useNavigate();

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const formMethods = useForm({
    resolver: zodResolver(updateBatchLinkSchema),
  });
  const isLoading = formMethods.formState.isSubmitting;

  const onSubmit = async (data: FieldValues) => {
    setFormError('');
    setFormSuccess('');
    try {
      const res = await updateBatchLink(batchId, data?.link, authToken!);
      if (res.status === 200) {
        setFormError('');
        setFormSuccess(MESSAGES.LINK_UPDATED);
        // eslint-disable-next-line no-alert
        alert(MESSAGES.LINK_UPDATED);
        formMethods.reset();
        navigate(TEACHER_DASHBOARD);
      }
    } catch (error) {
      setFormSuccess('');
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          setFormError(error.response?.data?.message);
        } else {
          setFormError(ERRORS.SERVER_ERROR);
        }
      } else {
        setFormError(ERRORS.SERVER_ERROR);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 px-6 py-2 justify-evenly tablet:flex-row tablet:justify-between tablet:items-center tablet:p-10 desktop:px-24">
      <div className="flex flex-col w-full gap-10">
        <p className="text-xl font-bold text-gold">Update Batch Link</p>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-center w-full pb-4">
              <FormInput
                type="text"
                name="link"
                placeholder="enter zoom link"
                label="Zoom Link *"
                disabled={isLoading}
              />
              <FormButton text="Update" isLoading={isLoading} />
              {formError !== '' ? (
                <div className="pt-4 text-xl">
                  <ErrorMessage errMessage={formError} iconRequired />
                </div>
              ) : null}
              {formSuccess !== '' ? (
                <div className="pt-4 text-xl">
                  <SuccessMessage successMessage={formSuccess} />
                </div>
              ) : null}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default TeacherUpdateLinkSection;
