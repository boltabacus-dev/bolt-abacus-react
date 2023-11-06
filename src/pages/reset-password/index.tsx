import { FC, useEffect, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import FormInput from '@components/atoms/FormInput';
import FormButton from '@components/atoms/FormButton';
import ErrorMessage from '@components/atoms/ErrorMessage';
import SeoComponent from '@components/atoms/SeoComponent';

import { resetPasswordSchema } from '@validations/auth';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PAGE } from '@constants/routes';
import { useAuthStore } from '@store/authStore';

import styles from './index.module.css';

interface ResetPasswordPageProps {}

const ResetPasswordPage: FC<ResetPasswordPageProps> = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();
  const [formError, setFormError] = useState('');

  const formMethods = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });
  const { isSubmitting } = formMethods.formState;

  const onSubmit = async (data: FieldValues) => {
    // TODO: Server call

    // eslint-disable-next-line no-console
    console.log({ resetPassword: data });

    setFormError('Checking');

    formMethods.reset();
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(LOGIN_PAGE);
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={`${styles.formSection}`}>
      <SeoComponent title="Reset Password" />
      <div className="flex flex-col items-center justify-center h-full px-2 desktop:px-20 desktop:pt-12 gap-y-2">
        <h1 className="mb-4 text-2xl font-bold desktop:mb-2 desktop:text-xl tablet:mb-8 desktop:font-semibold">
          Reset Password
        </h1>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <FormInput
              type="password"
              name="password"
              placeholder="enter password"
              label="Password *"
              disabled={isSubmitting}
              hasError={formError !== ''}
            />
            <FormInput
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              label="Confirm Password *"
              disabled={isSubmitting}
              hasError={formError !== ''}
            />
            <FormButton text="Reset Password" isLoading={isSubmitting} />
            {formError !== '' && (
              <div className="flex justify-center text-xs text-center">
                <ErrorMessage errMessage={formError} iconRequired />
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
