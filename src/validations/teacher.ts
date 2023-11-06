import { z } from 'zod';

/*
 * Update Batch Link Input Schema
 */
export const updateBatchLinkSchema = z.object({
  link: z
    .string()
    .min(1, 'Zoom Link required')
    .trim()
    .url({ message: 'Invalid Zoom link' }),
});

export type TUpdateBatchLinkSchema = z.infer<typeof updateBatchLinkSchema>;
