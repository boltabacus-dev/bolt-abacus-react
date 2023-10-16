import { z } from 'zod';

export const LoginResponseSchema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(['student', 'teacher']),
  token: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
