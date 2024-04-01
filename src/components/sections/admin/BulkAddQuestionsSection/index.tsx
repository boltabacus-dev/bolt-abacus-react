import { FC, useState } from 'react';
import { parse } from 'papaparse';
import { isAxiosError } from 'axios';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import swal from 'sweetalert';

import FormInput from '@components/atoms/FormInput';
import FormButton from '@components/atoms/FormButton';
import ErrorMessage from '@components/atoms/ErrorMessage';
import SuccessMessage from '@components/atoms/SuccessMessage';
import FormSelect, { LabelValuePair } from '@components/atoms/FormSelect';

import { useAuthStore } from '@store/authStore';
import { bulkAddQuestionSchema } from '@validations/admin';
import { getLevelSchemaRequest } from '@services/admin';
import { Question, QuestionsFileRowType } from '@interfaces/QuestionsFile';
import { ClassSchema, GetLevelSchemaResponse } from '@interfaces/apis/admin';

import { ERRORS } from '@constants/app';
import { levelOptions } from '@constants/levelOptions';
import { createTable, parseQuestions } from '@helpers/bulkUpload';

export interface BulkAddQuestionsSectionProps {}

type QuizType = 'Homework' | 'Classwork' | 'Test';

const BulkAddQuestionsSection: FC<BulkAddQuestionsSectionProps> = () => {
  const authToken = useAuthStore((state) => state.authToken);

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const [levelSchema, setLevelSchema] = useState<ClassSchema[]>();

  const [classIdOptions, setClassIdOptions] = useState<LabelValuePair[]>([]);
  const [topicIdOptions, setTopicIdOptions] = useState<LabelValuePair[]>([]);
  const [quizTypeOptions, setQuizTypeOptions] = useState<LabelValuePair[]>([]);

  const formMethods = useForm({
    resolver: zodResolver(bulkAddQuestionSchema),
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

  const [levelId, setLevelId] = useState<number>();
  const [classId, setClassId] = useState<number>();
  const [topicId, setTopicId] = useState<number>();
  const [quizType, setQuizType] = useState<QuizType>();
  const [questionsFromFile, setQuestionsFromFile] =
    useState<QuestionsFileRowType[]>();

  const submitApi = async (questions: Question[]) => {
    // eslint-disable-next-line no-console
    console.log(
      'sending questions to backend',
      questions,
      levelId,
      classId,
      topicId,
      quizType
    );
    setFormSuccess('');
  };

  const onSubmit = async (data: FieldValues) => {
    setLevelId(data?.levelId);
    setClassId(data?.classId);
    setTopicId(data?.topicId);
    setQuizType(data?.quizType);

    await parse(data?.questions[0], {
      header: true,
      skipEmptyLines: true,
      complete(results: { data: QuestionsFileRowType[] }) {
        setQuestionsFromFile(results.data);
      },
    });

    let questions: Question[] = [];

    try {
      questions = parseQuestions(questionsFromFile!);
    } catch (error) {
      let message = 'File Error';
      if (error instanceof Error) message = error.message;

      swal({
        title: 'File Error',
        text: message,
        icon: 'error',
      });
      return;
    }

    const tableContainer = document.createElement('div');
    tableContainer.className =
      'w-full flex justify-center items-center text-sm';
    tableContainer.append(createTable(questions));

    swal({
      title: 'Do you want to proceed further ?',
      text: 'Check the questions below',
      content: { element: tableContainer },
      icon: 'warning',
      closeOnEsc: true,
      buttons: ['No, cancel it!', 'Yes, I am sure!'],
    }).then(async (isConfirm) => {
      if (isConfirm) {
        await submitApi(questions);
      }
    });
  };

  return (
    <div className="flex flex-col gap-10 px-6 py-2 justify-evenly tablet:justify-between tablet:items-center tablet:p-10 desktop:px-36">
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
                </>
              )}
              <FormInput
                type="file"
                name="questions"
                placeholder="Upload File Here"
                label="Questions *"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />
            </div>
            <div className="flex justify-center desktop:justify-start">
              <FormButton
                text="Add Questions"
                isLoading={isFormLoading || loading}
              />
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

export default BulkAddQuestionsSection;
