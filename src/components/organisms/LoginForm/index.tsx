/* eslint-disable no-console */
import { FC, useState } from 'react';
import axios from '@helpers/axios';
import { isAxiosError } from 'axios';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import ErrorMessage from '@components/atoms/ErrorMessage';
import FormButton from '@components/atoms/FormButton';
import FormInput from '@components/atoms/FormInput';
import { loginSchema } from '@validations/auth';

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => {
  const navigate = useNavigate();
  const [isInvalidCred, setIsInvalidCred] = useState(false);
  const [formError, setFormError] = useState('');
  const formMethods = useForm({
    resolver: zodResolver(loginSchema),
  });
  const isLoading = formMethods.formState.isSubmitting;

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await axios.post('/login/', {
        email: data?.email,
        password: data?.password,
      });
      if (res.status === 200) {
        setFormError('');
        setIsInvalidCred(false);
        const loginData = res.data;
        const userData = {
          name: {
            first: loginData?.firstName,
            last: loginData?.lastName,
          },
          role: loginData?.role,
        };

        console.log(userData);

        navigate(`/${userData.role}/dashboard`);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401) {
          setIsInvalidCred(true);
          setFormError(error.response?.data?.message);
        } else {
          setIsInvalidCred(false);
          setFormError('Something went wrong. Please try again.');
        }
      } else {
        setIsInvalidCred(false);
        setFormError('Something went wrong. Please try again.');
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
