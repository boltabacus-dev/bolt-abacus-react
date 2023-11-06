import { z } from 'zod';

export const LoginResponseSchema = z.object({
  email: z.string(),
  phone: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(['Student', 'Teacher', 'Admin']),
  token: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
