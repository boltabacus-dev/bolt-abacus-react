/* eslint-disable no-console */
import { FC, useState } from 'react';
import { isAxiosError } from 'axios';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import FormSelect, { LabelValuePair } from '@components/atoms/FormSelect';
import VanillaFormSelect from '@components/atoms/VanillaFormSelect';
import FormButton from '@components/atoms/FormButton';
import ErrorMessage from '@components/atoms/ErrorMessage';

import { useAuthStore } from '@store/authStore';
import { viewQuizFormSchema } from '@validations/admin';
import { getAllQuizQuestionsRequest } from '@services/question';
import { QuizQuestion, QuizQuestionsResponse } from '@interfaces/apis/admin';

import { ERRORS } from '@constants/app';
import { levelOptions } from '@constants/levelOptions';
import QuizQuestionsTable from '@components/organisms/QuizQuestionsTable';
import SuccessMessage from '@components/atoms/SuccessMessage';

export interface ViewQuizSectionProps {}

const ViewQuizSection: FC<ViewQuizSectionProps> = () => {
  const authToken = useAuthStore((state) => state.authToken);

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const [levelId, setLevelId] = useState<number>();

  const [classIdOptions, setClassIdOptions] = useState<LabelValuePair[]>([]);
  const [topicIdOptions, setTopicIdOptions] = useState<LabelValuePair[]>([]);
  const [quizTypeOptions, setQuizTypeOptions] = useState<LabelValuePair[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>();

  const onLevelChange = async (value: string) => {
    setLoading(true);

    const level = parseInt(value, 10);
    setLevelId(level);

    try {
      // TODO: API call for schema
      setClassIdOptions([
        { label: 'Class 1', value: 1 },
        { label: 'Class 2', value: 2 },
        { label: 'Class 3', value: 3 },
        { label: 'Class 4', value: 4 },
      ]);
      setTopicIdOptions([
        { label: 'Topic 1', value: 1 },
        { label: 'Topic 2', value: 2 },
        { label: 'Topic 3', value: 3 },
        { label: 'Topic 4', value: 4 },
      ]);
      setQuizTypeOptions([
        { label: 'Classwork', value: 'Classwork' },
        { label: 'Homework', value: 'Homework' },
        { label: 'Test', value: 'Test' },
      ]);
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

  const formMethods = useForm({
    resolver: zodResolver(viewQuizFormSchema),
  });
  const isFormLoading = formMethods.formState.isSubmitting;

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await getAllQuizQuestionsRequest(
        levelId!,
        data?.classId,
        data?.topicId,
        data?.quizType,
        authToken!
      );
      if (res.status === 200) {
        const questionsResponse: QuizQuestionsResponse = res.data;
        setFormError('');
        setQuizQuestions(questionsResponse.questions);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401) {
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
        <p className="text-xl font-bold text-gold">View Quiz Details</p>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <div className="grid w-full grid-cols-1 pb-4 justify-items-center desktop:justify-items-start desktop:grid-cols-2">
              <VanillaFormSelect
                name="levelId"
                placeholder="Choose Level Id"
                label="Level Id *"
                value={levelId!}
                onchange={onLevelChange}
                options={levelOptions}
              />
              {!loading && (
                <>
                  <FormSelect
                    name="classId"
                    placeholder="Choose Class Id"
                    label="Class Id *"
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
                </>
              )}
            </div>
            <div className="flex justify-center desktop:justify-start">
              <FormButton text="Search" isLoading={isFormLoading} />
            </div>
            {formError !== '' ? (
              <div className="flex justify-center text-xl text-center">
                <ErrorMessage errMessage={formError} iconRequired />
              </div>
            ) : null}
          </form>
        </FormProvider>
      </div>
      <div className="w-full">
        {quizQuestions &&
          (quizQuestions.length > 0 ? (
            <QuizQuestionsTable questions={quizQuestions!} />
          ) : (
            <div className="w-full flex items-center justify-center">
              <SuccessMessage successMessage="Quiz has no questions in it. Please add questions!" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ViewQuizSection;
