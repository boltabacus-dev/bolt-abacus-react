import { FC, useState } from 'react';
import { isAxiosError } from 'axios';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import FormSelect, { LabelValuePair } from '@components/atoms/FormSelect';
import FormButton from '@components/atoms/FormButton';
import ErrorMessage from '@components/atoms/ErrorMessage';

import { useAuthStore } from '@store/authStore';
import { viewOrganizationFormSchema } from '@validations/admin';
import { getTagDetailsRequest } from '@services/organization';
import {
  GetTagDetailsResponse,
  TagDetails,
} from '@interfaces/apis/organization';

import { ERRORS } from '@constants/app';
import OrganizationCard from '@components/molecules/OrganizationCard';

export interface ViewOrganizationSectionProps {
  tagNames: string[];
}

const ViewOrganizationSection: FC<ViewOrganizationSectionProps> = ({
  tagNames,
}) => {
  const authToken = useAuthStore((state) => state.authToken);
  const [tagDetails, setTagDetails] = useState<TagDetails | null>();

  const formMethods = useForm({
    resolver: zodResolver(viewOrganizationFormSchema),
  });

  const isFormLoading = formMethods.formState.isSubmitting;
  const [formError, setFormError] = useState('');

  const onSubmit = async (data: FieldValues) => {
    setTagDetails(null);
    try {
      const res = await getTagDetailsRequest(data?.tagName, authToken!);
      if (res.status === 200) {
        const tagDetailsResponse: GetTagDetailsResponse = res.data;
        setFormError('');
        setTagDetails(tagDetailsResponse);
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

  const getOptions = (arr: Array<string>) => {
    const options: LabelValuePair[] = [];
    arr.map((item) => {
      return options.push({
        label: item,
        value: item,
      });
    });
    return options;
  };

  return (
    <div className="flex gap-10 px-6 py-2 justify-evenly flex-col tablet:justify-between tablet:items-center tablet:p-10 desktop:px-36">
      <div className="flex flex-col w-full gap-8">
        <p className="text-xl font-bold text-gold">View Organization Details</p>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <FormSelect
              width="full"
              name="tagName"
              placeholder="Select Tag Name"
              label="Tag Name *"
              options={getOptions(tagNames)}
              disabled={isFormLoading}
            />
            <FormButton text="Search" isLoading={isFormLoading} width="full" />

            {formError !== '' ? (
              <div className="flex justify-center text-xl text-center">
                <ErrorMessage errMessage={formError} iconRequired />
              </div>
            ) : null}
          </form>
        </FormProvider>
      </div>
      <div className="w-full">
        {tagDetails && <OrganizationCard tagDetails={tagDetails} />}
      </div>
    </div>
  );
};

export default ViewOrganizationSection;
