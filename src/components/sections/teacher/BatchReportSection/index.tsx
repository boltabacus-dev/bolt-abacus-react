import { FC, useState } from 'react';
import { isAxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

import FormButton from '@components/atoms/FormButton';
import FormSelect, { LabelValuePair } from '@components/atoms/FormSelect';
import ErrorMessage from '@components/atoms/ErrorMessage';
import BatchReportTable from '@components/organisms/BatchReportTable';

import { useAuthStore } from '@store/authStore';
import { getBatchReportSchema } from '@validations/teacher';
import { ClassSchema, GetLevelSchemaResponse } from '@interfaces/apis/admin';
import {
  GetBatchReportResponse,
  StudentReport,
} from '@interfaces/apis/teacher';
import { getLevelSchemaRequest } from '@services/admin';
import { getBatchReportRequest } from '@services/teacher';

import { ERRORS } from '@constants/app';
import { levelOptions } from '@constants/levelOptions';

export interface BatchReportSectionProps {
  batchId: number;
}

const BatchReportSection: FC<BatchReportSectionProps> = ({ batchId }) => {
  const authToken = useAuthStore((state) => state.authToken);

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const [levelSchema, setLevelSchema] = useState<ClassSchema[]>();

  const [classIdOptions, setClassIdOptions] = useState<LabelValuePair[]>([]);
  const [topicIdOptions, setTopicIdOptions] = useState<LabelValuePair[]>([]);

  const [studentReports, setStudentReports] = useState<
    StudentReport[] | null
  >();

  const formMethods = useForm({
    resolver: zodResolver(getBatchReportSchema),
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
      const res = await getBatchReportRequest(
        batchId,
        data?.levelId,
        data?.classId,
        data?.topicId,
        authToken!
      );
      if (res.status === 200) {
        setFormError('');

        const getBatchReportResponse: GetBatchReportResponse = res.data;
        setStudentReports(getBatchReportResponse.reports);
      }
    } catch (error) {
      setStudentReports(null);
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401 || status === 403 || status === 404) {
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
    <div className="flex flex-col gap-4 px-6 py-2 justify-evenly tablet:flex-row tablet:justify-between tablet:items-center tablet:p-10 desktop:px-24">
      <div className="flex flex-col w-full gap-6">
        <p className="text-xl font-bold text-gold">Batch Report</p>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <div className="grid w-full grid-cols-1 pb-4 gap-x-5 desktop:gap-x-10 justify-items-center desktop:justify-items-start desktop:grid-cols-3">
              <FormSelect
                name="levelId"
                placeholder="Choose Level Id"
                label="Level Id *"
                onchange={onLevelChange}
                options={levelOptions}
                width="full"
              />
              {!loading && (
                <>
                  <FormSelect
                    name="classId"
                    placeholder="Choose Class Id"
                    label="Class Id *"
                    onchange={onClassChange}
                    options={classIdOptions!}
                    width="full"
                  />
                  <FormSelect
                    name="topicId"
                    placeholder="Choose Topic Id"
                    label="Topic Id *"
                    options={topicIdOptions!}
                    width="full"
                  />
                </>
              )}
              <div className="w-full desktop:col-span-3 tablet:flex tablet:items-center tablet:justify-center">
                <FormButton
                  text="Search"
                  isLoading={isFormLoading || loading}
                  width="full"
                />
              </div>
            </div>
            {formError !== '' ? (
              <div className="flex justify-center text-xl text-center">
                <ErrorMessage errMessage={formError} iconRequired />
              </div>
            ) : null}
          </form>
        </FormProvider>
        {studentReports &&
          (studentReports.length === 0 ? (
            <div className="flex justify-center">
              <ErrorMessage
                errMessage="No Records Found"
                iconRequired={false}
              />
            </div>
          ) : (
            <BatchReportTable studentReports={studentReports} />
          ))}
      </div>
    </div>
  );
};

export default BatchReportSection;
