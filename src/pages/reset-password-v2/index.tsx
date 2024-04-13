import { FC, useState } from 'react';
import { isAxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import swal from 'sweetalert';

import FormInput from '@components/atoms/FormInput';
import FormButton from '@components/atoms/FormButton';
import ErrorMessage from '@components/atoms/ErrorMessage';
import SeoComponent from '@components/atoms/SeoComponent';

import { resetPasswordRequest } from '@services/auth';
import { resetPasswordSchema } from '@validations/auth';
import { ResetPasswordPageParams } from '@interfaces/RouteParams';

import { LOGIN_PAGE } from '@constants/routes';
import { ERRORS, MESSAGES } from '@constants/app';

import styles from './index.module.css';

interface ResetPasswordPageV2Props {}

const ResetPasswordPageV2: FC<ResetPasswordPageV2Props> = () => {
  const params = useParams<ResetPasswordPageParams>();

  const navigate = useNavigate();

  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const formMethods = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });
  const { isSubmitting } = formMethods.formState;

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await resetPasswordRequest(data?.password, params.authToken!);
      if (res.status === 200) {
        setFormError('');
        setFormError('');
        swal(MESSAGES.PASSWORD_RESET, {
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
          setFormError(ERRORS.SERVER_ERROR);
        }
      } else {
        setFormError(ERRORS.SERVER_ERROR);
      }
    }

    formMethods.reset();
  };

  return (
    <div className={`${styles.formSection}`}>
      <SeoComponent title="Reset Password" />
      <div className="flex flex-col justify-center h-full gap-4 p-10 tablet:gap-12 tablet:px-20 tablet:pt-12">
        <h1 className="text-xl font-bold text-gold">Reset Password</h1>
        <div className="flex-1">
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <div className="grid flex-1 grid-cols-1 desktop:gap-2 desktop:grid-cols-2">
                <FormInput
                  type="password"
                  name="password"
                  placeholder="enter password"
                  label="Password *"
                  disabled={isSubmitting}
                  hasError={formError !== ''}
                  showPassword={showPassword}
                />
                <FormInput
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                  label="Confirm Password *"
                  disabled={isSubmitting}
                  hasError={formError !== ''}
                  showPassword={showPassword}
                />
                <div className="pt-4 desktop:pt-14">
                  <label
                    htmlFor="showPassword"
                    className="flex items-center w-1/2 gap-1 text-sm font-medium"
                  >
                    <input
                      type="checkbox"
                      name="showPassword"
                      id="showPassword"
                      onChange={(e) => setShowPassword(e.target.checked)}
                    />
                    Show Password
                  </label>

                  <FormButton text="Reset Password" isLoading={isSubmitting} />
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
  );
};

export default ResetPasswordPageV2;
