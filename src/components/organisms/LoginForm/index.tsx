/* eslint-disable no-console */
import { FC, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import ErrorMessage from '@components/atoms/ErrorMessage';
import FormButton from '@components/atoms/FormButton';
import FormInput from '@components/atoms/FormInput';
import { loginSchema } from '@validations/auth';

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => {
  const [formError, setFormError] = useState('');
  const formMethods = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    console.log('Submit Login API Call');
    console.log(data);
    setFormError('');
  };

  const { isSubmitting } = formMethods.formState;

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
            disabled={isSubmitting}
          />
          <FormInput
            type="password"
            name="password"
            placeholder="enter password"
            label="Password *"
            disabled={isSubmitting}
          />
          <FormButton text="Sign In" isLoading={isSubmitting} />
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
