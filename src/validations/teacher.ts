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

/*
 * Get Batch Report Form Input Schema
 */
export const getBatchReportSchema = z.object({
  levelId: z.coerce.number().min(1, 'Invalid Level Id'),
  classId: z.coerce.number().min(1, 'Invalid Class Id'),
  topicId: z.coerce.number().min(1, 'Invalid Topic Id'),
});

export type TGetBatchReportSchema = z.infer<typeof getBatchReportSchema>;
