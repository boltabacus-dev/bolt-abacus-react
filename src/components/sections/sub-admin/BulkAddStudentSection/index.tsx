import { FC, useState } from 'react';
import { isAxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { parse } from 'papaparse';
import swal from 'sweetalert';

import FormButton from '@components/atoms/FormButton';
import FormInput from '@components/atoms/FormInput';
import ErrorMessage from '@components/atoms/ErrorMessage';
import SuccessMessage from '@components/atoms/SuccessMessage';
import InfoMessage from '@components/atoms/InfoMessage';
import FormSelect, { LabelValuePair } from '@components/atoms/FormSelect';

import { bulkAddStudentFormSchema } from '@validations/admin';
import { bulkAddStudentRequest } from '@services/student';
import { useAuthStore } from '@store/authStore';

import { Batch } from '@interfaces/apis/batch';
import { ERRORS, MESSAGES } from '@constants/app';
import { Student, StudentsFileRowType } from '@interfaces/StudentsFile';
import {
  createErrors,
  createTableStudents,
  parseStudents,
} from '@helpers/bulkUpload';

export interface BulkAddStudentSectionProps {
  batches: Array<Batch>;
}

const BulkAddStudentSection: FC<BulkAddStudentSectionProps> = ({ batches }) => {
  const authToken = useAuthStore((state) => state.authToken);

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formMethods = useForm({
    resolver: zodResolver(bulkAddStudentFormSchema),
  });

  const submitApi = async (students: Student[], batchId: number) => {
    setIsLoading(true);
    try {
      const res = await bulkAddStudentRequest(students, batchId, authToken!);

      if (res.status === 200) {
        setFormError('');
        setFormSuccess(MESSAGES.All_STUDENT_CREATED);
        swal(MESSAGES.All_STUDENT_CREATED, {
          icon: 'success',
        });
        setIsLoading(false);
        formMethods.reset();
      }

      if (res.status === 206) {
        const numberOfStudentsAdded: number = res.data?.NumberOfStudentsAdded;
        const existingStudents: string[] = res.data?.ExistingStudents;
        const multipleEntries: string[] = res.data?.MultipleEntries;
        const undefinedErrors: string[] = res.data?.UndefinedError;

        const errorContainer = document.createElement('div');
        errorContainer.className = 'w-full flex text-sm';

        const scrollableWrapper = document.createElement('div');
        scrollableWrapper.className = 'w-full max-h-60 overflow-y-scroll';
        scrollableWrapper.append(errorContainer);

        errorContainer.innerHTML = createErrors(
          existingStudents,
          multipleEntries,
          undefinedErrors
        );

        swal({
          title: 'Partial students were uploaded successfully!',
          text: `${numberOfStudentsAdded} students were added. Please find the reasons below`,
          content: { element: scrollableWrapper },
          icon: 'warning',
          closeOnEsc: true,
        });

        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
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

  const onSubmit = async (data: FieldValues) => {
    setFormError('');
    setFormSuccess('');
    setIsLoading(true);
    await parse(data?.students[0], {
      header: true,
      skipEmptyLines: true,
      complete(results: { data: StudentsFileRowType[] }) {
        let students: Student[] = [];
        try {
          students = parseStudents(results.data!);
        } catch (error) {
          let message = ERRORS.SERVER_ERROR;
          if (error instanceof Error) message = error.message;

          swal({
            title: ERRORS.CSV_FILE_ERROR,
            text: message,
            icon: 'error',
          });
          setIsLoading(false);
          formMethods.reset();
          return;
        }

        const tableContainer = document.createElement('div');
        tableContainer.className =
          'w-full flex justify-center items-center text-sm';

        const scrollableWrapper = document.createElement('div');
        scrollableWrapper.className = 'w-full max-h-60 overflow-y-scroll';
        scrollableWrapper.append(createTableStudents(students));

        tableContainer.append(scrollableWrapper);

        swal({
          title: 'Do you want to proceed further ?',
          text: 'Check the students below',
          content: { element: tableContainer },
          icon: 'warning',
          closeOnEsc: true,
          buttons: ['No, cancel it!', 'Yes, I am sure!'],
        }).then(async (isConfirm) => {
          if (isConfirm) {
            await submitApi(students, data?.batchId);
          }
        });
        setIsLoading(false);
      },
    });
  };

  const getOptions = (arr: Array<Batch>) => {
    const options: LabelValuePair[] = [];
    arr.map((item) => {
      return options.push({
        label: item.batchName,
        value: item.batchId,
      });
    });
    return options;
  };

  return (
    <div className="flex flex-col gap-3 px-6 py-2 justify-evenly tablet:flex-row tablet:justify-between tablet:items-center tablet:p-10 desktop:px-36">
      <div className="flex flex-col w-full gap-10">
        <p className="text-xl font-bold text-gold">Bulk Add Student</p>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <div className="grid w-full grid-cols-1 pb-4 justify-items-center desktop:justify-items-start desktop:grid-cols-2">
              <FormSelect
                name="batchId"
                placeholder="Select Batch"
                label="Batch *"
                options={getOptions(batches)}
                disabled={isLoading}
              />
              <FormInput
                type="file"
                name="students"
                placeholder="Upload File Here"
                label="Students *"
                disabled={isLoading}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />
            </div>
            <div className="flex justify-center desktop:justify-start">
              <FormButton text="Add Students" isLoading={isLoading} />
            </div>
            {isLoading ? (
              <div className="flex justify-center text-xl text-center animate-pulse">
                <InfoMessage infoMessage={MESSAGES.WAIT_BULK_STUDENTS} />
              </div>
            ) : null}
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

export default BulkAddStudentSection;
