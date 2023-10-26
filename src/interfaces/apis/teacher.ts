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
