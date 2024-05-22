import { z } from 'zod';

// Get All TagNames API Response
export const GetAllTagNamesResponseSchema = z.object({
  tagNames: z.array(z.string()),
});
export type GetAllTagNamesResponse = z.infer<
  typeof GetAllTagNamesResponseSchema
>;
