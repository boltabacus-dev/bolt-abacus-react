import { FC, useState } from 'react';
import { isAxiosError } from 'axios';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import FormSelect, { LabelValuePair } from '@components/atoms/FormSelect';
import FormButton from '@components/atoms/FormButton';
import ErrorMessage from '@components/atoms/ErrorMessage';
import SuccessMessage from '@components/atoms/SuccessMessage';
import QuizQuestionsTable from '@components/organisms/QuizQuestionsTable';

import { useAuthStore } from '@store/authStore';
import { viewQuizFormSchema } from '@validations/admin';
import { getLevelSchemaRequest } from '@services/admin';
import { getAllQuizQuestionsRequest } from '@services/question';
import {
  ClassSchema,
  GetLevelSchemaResponse,
  QuizQuestion,
  QuizQuestionsResponse,
} from '@interfaces/apis/admin';

import { ERRORS } from '@constants/app';
import { levelOptions } from '@constants/levelOptions';

export interface ViewQuizSectionProps {}

const ViewQuizSection: FC<ViewQuizSectionProps> = () => {
  const authToken = useAuthStore((state) => state.authToken);

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const [levelSchema, setLevelSchema] = useState<ClassSchema[]>();
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>();

  const [classIdOptions, setClassIdOptions] = useState<LabelValuePair[]>([]);
  const [topicIdOptions, setTopicIdOptions] = useState<LabelValuePair[]>([]);
  const [quizTypeOptions, setQuizTypeOptions] = useState<LabelValuePair[]>([]);

  const formMethods = useForm({
    resolver: zodResolver(viewQuizFormSchema),
  });
  const isFormLoading = formMethods.formState.isSubmitting;

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
          setFormError(
            err.response?.data?.error ||
              err.response?.data?.message ||
              ERRORS.SERVER_ERROR
          );
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
    try {
      const res = await getAllQuizQuestionsRequest(
        data?.levelId,
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
        if (status === 401 || status === 403) {
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
  };

  return (
    <div className="flex gap-10 px-6 py-2 justify-evenly flex-col tablet:justify-between tablet:items-center tablet:p-10 desktop:px-36">
      <div className="flex flex-col w-full gap-10">
        <p className="text-xl font-bold text-gold">View Quiz Details</p>
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
