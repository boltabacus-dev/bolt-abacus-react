import { z } from 'zod';

// Get All Batches API Response

export const BatchSchema = z.object({
  batchId: z.number(),
  batchName: z.string(),
});
export type Batch = z.infer<typeof BatchSchema>;

export const GetAllBatchesResponseSchema = z.object({
  batches: z.array(BatchSchema),
});
export type GetAllBatchesResponse = z.infer<typeof GetAllBatchesResponseSchema>;
