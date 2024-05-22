import axios from '@helpers/axios';

import {
  GET_ALL_TAG_NAMES_ENDPOINT,
  ADD_TAG_ENDPOINT,
  GET_TAG_DETAILS_ENDPOINT,
  EDIT_TAG_ENDPOINT,
} from '@constants/routes';

export const getAllTagNamesRequest = async (token: string) => {
  return axios.get(GET_ALL_TAG_NAMES_ENDPOINT, {
    headers: { 'AUTH-TOKEN': token },
  });
};

export const getTagDetailsRequest = async (tagName: string, token: string) => {
  return axios.post(
    GET_TAG_DETAILS_ENDPOINT,
    {
      tagName,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};

export const addTagRequest = async (
  organizationName: string,
  tagName: string,
  expirationDate: string,
  maxLevel: number,
  maxClass: number,
  totalNumberOfStudents: number,
  token: string,
  numberOfTeachers: number = 0,
  numberOfStudents: number = 0,
  isIndividualTeacher: boolean = false
) => {
  return axios.post(
    ADD_TAG_ENDPOINT,
    {
      organizationName,
      tagName,
      isIndividualTeacher,
      numberOfTeachers,
      numberOfStudents,
      expirationDate,
      totalNumberOfStudents,
      maxLevel,
      maxClass,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};

export const editTagDetailsRequest = async (
  organizationName: number,
  tagName: string,
  expirationDate: string,
  maxLevel: number,
  maxClass: number,
  totalNumberOfStudents: number,
  numberOfTeachers: number,
  numberOfStudents: number,
  isIndividualTeacher: boolean,
  token: string
) => {
  return axios.post(
    EDIT_TAG_ENDPOINT,
    {
      organizationName,
      tagName,
      isIndividualTeacher,
      numberOfTeachers,
      numberOfStudents,
      expirationDate,
      totalNumberOfStudents,
      maxLevel,
      maxClass,
    },
    {
      headers: { 'AUTH-TOKEN': token },
    }
  );
};
