import { z } from 'zod';
import validator from 'validator';

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
    .refine(validator.isMobilePhone, 'Invalid mobile number'),
});

export type TAddTeacherFormSchema = z.infer<typeof addTeacherFormSchema>;

/*
 * Add Student Form Input Schema
 */
export const addStudentFormSchema = z.object({
  firstName: z.string().min(1, 'First Name is required').trim(),
  lastName: z.string().min(1, 'Last Name is required').trim(),
  email: z.string().min(1, 'Email is required').email('Invalid email').trim(),
  batch: z.coerce.number().min(1, 'Invalid batch number'),
  phone: z
    .string()
    .trim()
    .length(10, 'Invalid mobile number')
    .refine(validator.isMobilePhone, 'Invalid mobile number'),
});

export type TAddStudentFormSchema = z.infer<typeof addStudentFormSchema>;
