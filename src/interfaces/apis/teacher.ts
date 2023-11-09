import { z } from 'zod';

// Get All Teaches API Response

export const TeacherSchema = z.object({
  userId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
});
export type Teacher = z.infer<typeof TeacherSchema>;

export const GetAllTeachersResponseSchema = z.object({
  teachers: z.array(TeacherSchema),
});

export type GetAllTeachersResponse = z.infer<
  typeof GetAllTeachersResponseSchema
>;

// Get Teacher Batches API Response
export const BatchSchema = z.object({
  batchId: z.number(),
  batchName: z.string(),
  timings: z.string(),
});
export type Batch = z.infer<typeof BatchSchema>;

export const GetTeacherBatchesResponseSchema = z.object({
  batches: z.object({
    Monday: z.array(BatchSchema),
    Tuesday: z.array(BatchSchema),
    Wednesday: z.array(BatchSchema),
    Thursday: z.array(BatchSchema),
    Friday: z.array(BatchSchema),
    Saturday: z.array(BatchSchema),
    Sunday: z.array(BatchSchema),
  }),
});

export type GetTeacherBatchesResponse = z.infer<
  typeof GetTeacherBatchesResponseSchema
>;

// Get Teacher Batches API Response
export const UpdateClassResponseSchema = z.object({
  message: z.string(),
  class: z.number(),
  level: z.number(),
});

export type UpdateClassResponse = z.infer<typeof UpdateClassResponseSchema>;

// Get Batch Report API Response
export const StudentReportSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  classwork: z.number(),
  homework: z.number(),
  test: z.number(),
});
export type StudentReport = z.infer<typeof StudentReportSchema>;

export const GetBatchReportResponseSchema = z.object({
  reports: z.array(StudentReportSchema),
});

export type GetBatchReportResponse = z.infer<
  typeof GetBatchReportResponseSchema
>;
