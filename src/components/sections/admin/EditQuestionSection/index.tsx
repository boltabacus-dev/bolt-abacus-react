/* eslint-disable no-console */
import { FC, useState } from 'react';
import { isAxiosError } from 'axios';
import {
  FieldValues,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { MdDelete } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';

import FormInput from '@components/atoms/FormInput';
import FormButton from '@components/atoms/FormButton';
import ErrorMessage from '@components/atoms/ErrorMessage';
import SuccessMessage from '@components/atoms/SuccessMessage';

import { editQuestionSchema } from '@validations/admin';

import { ERRORS } from '@constants/app';
import FormSelect from '@components/atoms/FormSelect';
import { QuizQuestion } from '@interfaces/apis/admin';

export interface EditQuestionSectionProps {
  question: QuizQuestion;
}

const EditQuestionSection: FC<EditQuestionSectionProps> = ({ question }) => {
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const formMethods = useForm({
    resolver: zodResolver(editQuestionSchema),
    defaultValues: editQuestionSchema.parse({
      number: question.question.numbers,
      operator: question.question.operator,
      correctAnswer: question.correctAnswer,
    }),
  });
  const isFormLoading = formMethods.formState.isSubmitting;
  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: 'number',
  });

  const onSubmit = async (data: FieldValues) => {
    if (data?.number?.length < 2) {
      setFormError('Minimum 2 numbers required!');
      setFormSuccess('');
      return;
    }
    try {
      console.log(data);
    } catch (error) {
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
    <div className="flex gap-10 px-6 py-2 justify-evenly flex-col tablet:justify-between tablet:items-center tablet:p-10 desktop:px-36">
      <div className="flex flex-col w-full gap-10">
        <p className="text-xl font-bold text-gold">Edit Question</p>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <div className="grid w-full grid-cols-1 pb-4 justify-items-center desktop:justify-items-start desktop:grid-cols-2">
              <FormSelect
                name="operator"
                placeholder="Choose Operator"
                label="Operator *"
                options={[
                  {
                    label: 'Addition',
                    value: '+',
                  },
                  {
                    label: 'Multiplication',
                    value: '*',
                  },
                  {
                    label: 'Division',
                    value: '/',
                  },
                ]}
              />
              <FormInput
                type="number"
                name="correctAnswer"
                placeholder="Enter correct answer"
                label="Correct Answer *"
              />
            </div>
            <div className="pt-10 font-semibold text-white text-lg desktop:font-medium">
              Numbers *
            </div>
            <div className="grid w-full grid-cols-2 pb-4 justify-items-center desktop:justify-items-start desktop:grid-cols-4">
              {fields.map((_field, index) => {
                const err = formMethods.formState.errors.number;
                return (
                  <div
                    key={index}
                    className="flex gap-2 py-3 my-4 gap-y-1 desktop:py-2 desktop:my-4"
                  >
                    <input
                      className={`w-28 px-3 py-2 my-3 tablet:text-xl desktop:text-lg tablet:px-4 desktop:px-4 tablet:py-3 desktop:py-3 desktop:my-1 text-lg focus:outline-none placeholder:text-grey border-2 border-solid rounded-lg text-white bg-black 
                      ${
                        err
                          ? 'border-red/50 focus:border-red'
                          : 'border-gold/50 focus:border-gold'
                      }`}
                      {...formMethods.register(`number.${index}` as const)}
                    />
                    <button
                      type="button"
                      className="px-2 font-semibold text-center duration-150 ease-in-out text-xl hover:text-red"
                      onClick={() => remove(index)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              className="px-3 py-1 font-semibold text-center rounded-lg text-md duration-150 ease-in-out border border-gold hover:text-gold flex items-center justify-center"
              onClick={() => append(1)}
            >
              Add Number
            </button>

            <div className="flex justify-center desktop:justify-start">
              <FormButton text="Add Question" isLoading={isFormLoading} />
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

export default EditQuestionSection;
