import { FC, useState } from 'react';

import { isAxiosError } from 'axios';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import ErrorMessage from '@components/atoms/ErrorMessage';
import FormButton from '@components/atoms/FormButton';
import FormInput from '@components/atoms/FormInput';

import { loginSchema } from '@validations/auth';
import { loginRequest } from '@services/auth';
import { LoginResponse } from '@interfaces/auth';
import { useAuthStore } from '@store/authStore';
import { ERRORS } from '@constants/app';

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => {
  const navigate = useNavigate();

  const setAuthToken = useAuthStore((state) => state.setAuthToken);
  const setUser = useAuthStore((state) => state.setUser);

  const [isInvalidCred, setIsInvalidCred] = useState(false);
  const [formError, setFormError] = useState('');

  const formMethods = useForm({
    resolver: zodResolver(loginSchema),
  });
  const isLoading = formMethods.formState.isSubmitting;

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await loginRequest(data?.email, data?.password);
      if (res.status === 200) {
        setFormError('');
        setIsInvalidCred(false);

        const loginResponse: LoginResponse = res.data;

        setAuthToken(loginResponse.token);
        setUser({
          name: {
            first: loginResponse.firstName,
            last: loginResponse.lastName,
          },
          role: loginResponse.role,
        });

        navigate(`/${loginResponse.role}/dashboard`);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401) {
          setIsInvalidCred(true);
          setFormError(error.response?.data?.message);
        } else {
          setIsInvalidCred(false);
          setFormError(ERRORS.SERVER_ERROR);
        }
      } else {
        setIsInvalidCred(false);
        setFormError(ERRORS.SERVER_ERROR);
      }
    }
  };

  return (
    <div className="flex flex-col w-fit gap-y-2">
      <h1 className="mb-4 text-2xl font-bold desktop:mb-2 desktop:text-xl tablet:mb-8 desktop:font-semibold">
        Sign In
      </h1>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <FormInput
            type="email"
            name="email"
            placeholder="enter email"
            label="Email Address *"
            disabled={isLoading}
            hasError={isInvalidCred}
          />
          <FormInput
            type="password"
            name="password"
            placeholder="enter password"
            label="Password *"
            disabled={isLoading}
            hasError={isInvalidCred}
          />
          <FormButton text="Sign In" isLoading={isLoading} />
          {formError !== '' && (
            <div className="flex justify-center text-xs text-center">
              <ErrorMessage errMessage={formError} iconRequired />
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
