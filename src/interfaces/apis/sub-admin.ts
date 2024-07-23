import { z } from 'zod';

// Get Students API
export const GetStudentsResponseSchema = z.object({
  students: z.array(
    z.object({
      userId: z.number(),
      firstName: z.string(),
      lastName: z.string(),
      phoneNumber: z.string(),
      email: z.string(),
      blocked: z.boolean(),
    })
  ),
});

export type GetStudentsResponse = z.infer<typeof GetStudentsResponseSchema>;

// Get Student Batch Details API
export const GetStudentBatchDetailsSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  batchId: z.number(),
  batchName: z.string(),
});

export type GetStudentBatchDetailsResponse = z.infer<
  typeof GetStudentBatchDetailsSchema
>;

// Get Batch Teacher Details API
export const TeacherDetailsSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  userId: z.number(),
});

export type TeacherDetails = z.infer<typeof TeacherDetailsSchema>;

export const GetBatchTeacherSchema = z.object({
  teachers: z.array(TeacherDetailsSchema),
});

export type GetBatchTeacherResponse = z.infer<typeof GetBatchTeacherSchema>;
