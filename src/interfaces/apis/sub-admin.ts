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
