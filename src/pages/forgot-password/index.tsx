import { FC, useState } from 'react';
import { isAxiosError } from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import swal from 'sweetalert';

import FormInput from '@components/atoms/FormInput';
import FormButton from '@components/atoms/FormButton';
import ErrorMessage from '@components/atoms/ErrorMessage';
import SeoComponent from '@components/atoms/SeoComponent';

import { useAuthStore } from '@store/authStore';
import { forgotPasswordSchema } from '@validations/auth';
import { forgotPasswordRequest } from '@services/auth';

import { LOGIN_PAGE, RESET_PASSWORD_PAGE } from '@constants/routes';
import { ERRORS, MESSAGES } from '@constants/app';

import styles from './index.module.css';

interface ForgotPasswordPageProps {}

const ForgotPasswordPage: FC<ForgotPasswordPageProps> = () => {
  const navigate = useNavigate();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  const [formError, setFormError] = useState('');

  const formMethods = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const { isSubmitting } = formMethods.formState;

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await forgotPasswordRequest(data?.email);
      if (res.status === 200) {
        setFormError('');
        swal(MESSAGES.RESET_LINK_SENT, {
          icon: 'success',
        });

        navigate(LOGIN_PAGE);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401) {
          setFormError(
            error.response?.data?.error ||
              error.response?.data?.message ||
              ERRORS.SERVER_ERROR
          );
        } else {
          setFormError(error.response?.data?.message || ERRORS.SERVER_ERROR);
        }
      } else {
        setFormError(ERRORS.SERVER_ERROR);
      }
    }

    formMethods.reset();
  };

  return (
    <>
      {isAuthenticated && user && <Navigate to={RESET_PASSWORD_PAGE} />}
      <div className={`${styles.formSection}`}>
        <SeoComponent title="Reset Password" />
        <div className="flex flex-col justify-center h-full gap-4 p-10 tablet:gap-12 tablet:px-20 tablet:pt-12">
          <h1 className="text-xl font-bold text-gold">Forgot Password</h1>
          <div className="flex-1">
            <FormProvider {...formMethods}>
              <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div className="grid flex-1 grid-cols-1 desktop:gap-2 desktop:grid-cols-1">
                  <FormInput
                    type="email"
                    name="email"
                    placeholder="enter email"
                    label="Email *"
                    disabled={isSubmitting}
                    hasError={formError !== ''}
                  />
                  <div className="pt-4 desktop:pt-14">
                    <FormButton
                      text="Send Reset Mail"
                      isLoading={isSubmitting}
                    />
                    {formError !== '' && (
                      <div className="flex text-xs text-center">
                        <ErrorMessage errMessage={formError} iconRequired />
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
