// Get Students API

import { z } from 'zod';

export const GetStudentsResponseSchema = z.object({
  students: z.array(
    z.object({
      userId: z.number(),
      firstName: z.string(),
      lastName: z.string(),
    })
  ),
});

export type GetStudentsResponse = z.infer<typeof GetStudentsResponseSchema>;
