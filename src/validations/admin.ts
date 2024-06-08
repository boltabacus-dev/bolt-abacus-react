import { z } from 'zod';
import validator from 'validator';

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB

/*
 * Add Student Form Input Schema
 */
export const addTeacherFormSchema = z.object({
  firstName: z.string().min(1, 'First Name is required').trim(),
  lastName: z.string().min(1, 'Last Name is required').trim(),
  email: z.string().min(1, 'Email is required').email('Invalid email').trim(),
  phone: z
    .string()
    .trim()
    .refine(
      (val) =>
        validator.isMobilePhone(val, validator.isMobilePhoneLocales, {
          strictMode: true,
        }),
      'Enter valid phone number with country code'
    ),
});

export type TAddTeacherFormSchema = z.infer<typeof addTeacherFormSchema>;

/*
 * Add Student Form Input Schema
 */
export const addStudentFormSchema = z.object({
  firstName: z.string().min(1, 'First Name is required').trim(),
  lastName: z.string().min(1, 'Last Name is required').trim(),
  email: z.string().min(1, 'Email is required').email('Invalid email').trim(),
  batch: z.coerce.number().min(1, 'Invalid batch'),
  phone: z
    .string()
    .trim()
    .refine(
      (val) =>
        validator.isMobilePhone(val, validator.isMobilePhoneLocales, {
          strictMode: true,
        }),
      'Enter valid phone number with country code'
    ),
});

/*
 * Search Student Form Input Schema
 */
export const searchStudentSchema = z.object({
  name: z.string().min(1, 'Student name is required').trim(),
});

export type TSearchStudentSchema = z.infer<typeof searchStudentSchema>;

/*
 * Bulk Add Student Form Input Schema
 */
export const studentSchema = z.object({
  firstName: z.string().min(1, 'First Name is required').trim(),
  lastName: z.string().min(1, 'Last Name is required').trim(),
  email: z.string().min(1, 'Email is required').email('Invalid email').trim(),
  phone: z
    .string()
    .trim()
    .refine(
      (val) =>
        validator.isMobilePhone(val, validator.isMobilePhoneLocales, {
          strictMode: true,
        }),
      'Enter valid phone number with country code'
    ),
});

export const bulkAddStudentFormSchema = z.object({
  batchId: z.coerce.number().min(1, 'Invalid batch'),
  students: z.any().refine((files) => {
    return files?.[0]?.size <= MAX_FILE_SIZE * 3;
  }, `CSV file less than 15MB is required.`),
});

export type TBulkAddStudentFormSchema = z.infer<
  typeof bulkAddStudentFormSchema
>;

/*
 * Add Sub Admin Form Input Schema
 */
export const addSubAdminFormSchema = z.object({
  firstName: z.string().min(1, 'First Name is required').trim(),
  lastName: z.string().min(1, 'Last Name is required').trim(),
  email: z.string().min(1, 'Email is required').email('Invalid email').trim(),
  tagName: z
    .string({
      errorMap: () => ({ message: 'Invalid Tag Name Answer' }),
    })
    .refine((val) => val !== '-1', { message: 'Invalid Tag Name Answer' }),
  phone: z
    .string()
    .trim()
    .refine(
      (val) =>
        validator.isMobilePhone(val, validator.isMobilePhoneLocales, {
          strictMode: true,
        }),
      'Enter valid phone number with country code'
    ),
});

export type TAddSubAdminFormSchema = z.infer<typeof addSubAdminFormSchema>;

/*
 * Add Batch Form Input Schema
 */
export const addBatchFormSchema = z.object({
  batchName: z.string().min(1, 'Batch Name is required').trim(),
  teacher: z.coerce.number().min(1, 'Invalid teacher'),
  day: z.enum(
    [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    {
      errorMap: () => ({ message: 'Invalid Day' }),
    }
  ),
  time: z.string().trim().min(1, 'Invalid Time'),
});

export type TAddBatchFormSchema = z.infer<typeof addBatchFormSchema>;

/*
 * View Quiz Details Form Input Schema
 */
export const viewQuizFormSchema = z.object({
  levelId: z.coerce.number().min(1, 'Invalid Level Id'),
  classId: z.coerce.number().min(1, 'Invalid Class Id'),
  topicId: z.coerce.number().min(1, 'Invalid Topic Id'),
  quizType: z.enum(['Classwork', 'Homework', 'Test'], {
    errorMap: () => ({ message: 'Invalid Quiz Type' }),
  }),
});

export type TViewQuizFormSchema = z.infer<typeof viewQuizFormSchema>;

/*
 * Add Quiz Question Form Input Schema
 */
export const addQuestionSchema = z.object({
  levelId: z.coerce.number().min(1, 'Invalid Level Id'),
  classId: z.coerce.number().min(1, 'Invalid Class Id'),
  topicId: z.coerce.number().min(1, 'Invalid Topic Id'),
  quizType: z.enum(['Classwork', 'Homework', 'Test'], {
    errorMap: () => ({ message: 'Invalid Quiz Type' }),
  }),
  number: z.array(
    z.coerce.number({
      errorMap: () => ({ message: 'Invalid Number' }),
    })
  ),
  operator: z.enum(['+', '/', '*'], {
    errorMap: () => ({ message: 'Invalid Operator' }),
  }),
  correctAnswer: z.coerce.number({
    errorMap: () => ({ message: 'Invalid Correct Answer' }),
  }),
});

export type TAddQuestionSchema = z.infer<typeof addQuestionSchema>;

/*
 * Bulk Add Quiz Question Form Input Schema
 */
export const bulkAddQuestionSchema = z.object({
  levelId: z.coerce.number().min(1, 'Invalid Level Id'),
  classId: z.coerce.number().min(1, 'Invalid Class Id'),
  topicId: z.coerce.number().min(1, 'Invalid Topic Id'),
  quizType: z.enum(['Classwork', 'Homework', 'Test'], {
    errorMap: () => ({ message: 'Invalid Quiz Type' }),
  }),
  questions: z.any().refine((files) => {
    return files?.[0]?.size <= MAX_FILE_SIZE;
  }, `CSV file less than 5MB is required.`),
});

export type TBulkAddQuestionSchema = z.infer<typeof bulkAddQuestionSchema>;

/*
 * Edit Quiz Question Form Input Schema
 */
export const editQuestionSchema = z.object({
  number: z.coerce
    .number({
      errorMap: () => ({ message: 'Invalid Number' }),
    })
    .array(),
  operator: z.enum(['+', '/', '*'], {
    errorMap: () => ({ message: 'Invalid Operator' }),
  }),
  correctAnswer: z.coerce.number({
    errorMap: () => ({ message: 'Invalid Correct Answer' }),
  }),
});

export type TEditQuestionSchema = z.infer<typeof editQuestionSchema>;

/*
 * Edit Batch Details Form Input Schema
 */
export const editBatchSchema = z.object({
  batchName: z.string().min(1, 'Batch Name is required').trim(),
  timeDay: z.enum(
    [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    {
      errorMap: () => ({ message: 'Invalid Day' }),
    }
  ),
  timeSchedule: z.string().trim().min(1, 'Invalid Time'),
});

export type TEditBatchSchema = z.infer<typeof editBatchSchema>;

/*
 * Add Organization Form Input Schema
 */
export const addOrganizationFormSchema = z.object({
  organizationName: z.string().min(2, 'Invalid organization name').trim(),
  tagName: z.string().min(2, 'Invalid tag name').trim(),
  level: z.coerce
    .number({
      errorMap: () => ({ message: 'Invalid level' }),
    })
    .refine((val) => val >= 1 && val <= 10, {
      message: 'Level must be between 1 and 10',
    }),
  class: z.coerce
    .number({
      errorMap: () => ({ message: 'Invalid class' }),
    })
    .refine((val) => val >= 1 && val <= 12, {
      message: 'Class must be between 1 and 12',
    }),
  students: z.coerce
    .number({
      errorMap: () => ({ message: 'Invalid Student Count' }),
    })
    .refine((val) => val > 0 && val < 10000, {
      message: 'Student Count must be more than 0 and less than 10,000',
    }),
  expirationDate: z.string().refine(
    (val) => {
      const date = new Date(val);
      return !Number.isNaN(date.getTime()) && date > new Date();
    },
    {
      message: 'Expiration Date must be a valid date in the future',
    }
  ),
});

export type TAddOrganizationFormSchema = z.infer<
  typeof addOrganizationFormSchema
>;

/*
 * View Organization Details Form Input Schema
 */
export const viewOrganizationFormSchema = z.object({
  tagName: z
    .string()
    .min(2, 'Invalid tag name')
    .trim()
    .refine((val) => val !== '-1', { message: 'Invalid Tag Name Answer' }),
});

export type TViewOrganizationFormSchema = z.infer<
  typeof viewOrganizationFormSchema
>;

/*
 * Edit Organization Form Input Schema
 */
export const editOrganizationFormSchema = z.object({
  organizationName: z.string().min(2, 'Invalid organization name').trim(),
  tagName: z.string().min(2, 'Invalid tag name').trim(),
  level: z.coerce
    .number({
      errorMap: () => ({ message: 'Invalid level' }),
    })
    .refine((val) => val >= 1 && val <= 10, {
      message: 'Level must be between 1 and 10',
    }),
  class: z.coerce
    .number({
      errorMap: () => ({ message: 'Invalid class' }),
    })
    .refine((val) => val >= 1 && val <= 12, {
      message: 'Class must be between 1 and 12',
    }),
  students: z.coerce
    .number({
      errorMap: () => ({ message: 'Invalid Student Count' }),
    })
    .refine((val) => val > 0 && val < 10000, {
      message: 'Student Count must be more than 0 and less than 10,000',
    }),
  expirationDate: z.string().refine(
    (val) => {
      const date = new Date(val);
      return !Number.isNaN(date.getTime()) && date > new Date();
    },
    {
      message: 'Expiration Date must be a valid date in the future',
    }
  ),
});

export type TEditOrganizationFormSchema = z.infer<
  typeof editOrganizationFormSchema
>;
