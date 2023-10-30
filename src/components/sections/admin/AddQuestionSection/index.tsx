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

import FormSelect, { LabelValuePair } from '@components/atoms/FormSelect';
import FormButton from '@components/atoms/FormButton';
import ErrorMessage from '@components/atoms/ErrorMessage';
import SuccessMessage from '@components/atoms/SuccessMessage';

import { useAuthStore } from '@store/authStore';
import { getLevelSchemaRequest } from '@services/admin';
import { addQuestionSchema } from '@validations/admin';
import { ClassSchema, GetLevelSchemaResponse } from '@interfaces/apis/admin';

import { ERRORS, MESSAGES } from '@constants/app';
import { levelOptions } from '@constants/levelOptions';
import FormInput from '@components/atoms/FormInput';
import { addQuestionsRequest } from '@services/question';

export interface AddQuestionSectionProps {}

const AddQuestionSection: FC<AddQuestionSectionProps> = () => {
  const authToken = useAuthStore((state) => state.authToken);

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const [levelSchema, setLevelSchema] = useState<ClassSchema[]>();

  const [classIdOptions, setClassIdOptions] = useState<LabelValuePair[]>([]);
  const [topicIdOptions, setTopicIdOptions] = useState<LabelValuePair[]>([]);
  const [quizTypeOptions, setQuizTypeOptions] = useState<LabelValuePair[]>([]);

  const formMethods = useForm({
    resolver: zodResolver(addQuestionSchema),
  });
  const isFormLoading = formMethods.formState.isSubmitting;
  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: 'number',
  });

  const onLevelChange = async (value: string) => {
    setLoading(true);
    try {
      const levelId = parseInt(value, 10);
      const res = await getLevelSchemaRequest(levelId, authToken!);
      if (res.status === 200) {
        setFormError('');

        const getLevelSchemaResponse: GetLevelSchemaResponse = res.data;
        setLevelSchema(getLevelSchemaResponse.schema);

        const options: LabelValuePair[] = [];
        getLevelSchemaResponse.schema?.map((classSchema) => {
          options.push({
            label: `Class ${classSchema.classId}`,
            value: classSchema.classId,
          });
          return null;
        });

        setClassIdOptions(options);
        setTopicIdOptions([]);
        setQuizTypeOptions([
          { label: 'Classwork', value: 'Classwork' },
          { label: 'Homework', value: 'Homework' },
          { label: 'Test', value: 'Test' },
        ]);

        formMethods.resetField('classId');
        formMethods.resetField('topicId');
        formMethods.resetField('quizType');
      }
    } catch (err) {
      if (isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 401) {
          setFormError(err.response?.data?.message);
        } else {
          setFormError(ERRORS.SERVER_ERROR);
        }
      } else {
        setFormError(ERRORS.SERVER_ERROR);
      }
    } finally {
      setLoading(false);
    }
  };

  const onClassChange = (value: string) => {
    setLoading(true);
    try {
      const classId = parseInt(value, 10);
      const classSchema = levelSchema?.find((cls) => cls.classId === classId);

      const options: LabelValuePair[] = [];
      classSchema?.topicIds?.map((id) => {
        options.push({
          label: `Topic ${id}`,
          value: id,
        });
        return null;
      });
      setTopicIdOptions(options);

      formMethods.resetField('topicId');
      formMethods.resetField('quizType');
    } catch (err) {
      setFormError(ERRORS.SERVER_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    if (data?.number?.length < 2) {
      setFormError('Minimum 2 numbers required!');
      setFormSuccess('');
      return;
    }
    try {
      const res = await addQuestionsRequest(
        data?.levelId,
        data?.classId,
        data?.topicId,
        data?.quizType,
        {
          operator: data?.operator,
          numbers: data?.number,
        },
        data?.correctAnswer,
        authToken!
      );
      if (res.status === 200) {
        console.log(res.data);
        setFormError('');
        setFormSuccess(MESSAGES.QUESTION_ADDED);
      }
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
        <p className="text-xl font-bold text-gold">Add Question</p>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <div className="grid w-full grid-cols-1 pb-4 justify-items-center desktop:justify-items-start desktop:grid-cols-2">
              <FormSelect
                name="levelId"
                placeholder="Choose Level Id"
                label="Level Id *"
                onchange={onLevelChange}
                options={levelOptions}
              />
              {!loading && (
                <>
                  <FormSelect
                    name="classId"
                    placeholder="Choose Class Id"
                    label="Class Id *"
                    onchange={onClassChange}
                    options={classIdOptions!}
                  />
                  <FormSelect
                    name="topicId"
                    placeholder="Choose Topic Id"
                    label="Topic Id *"
                    options={topicIdOptions!}
                  />
                  <FormSelect
                    name="quizType"
                    placeholder="Choose Quiz Type"
                    label="Quiz Type *"
                    options={quizTypeOptions!}
                  />
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
                </>
              )}
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
                      {...formMethods.register(`number.${index}`)}
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

export default AddQuestionSection;
