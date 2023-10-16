import { z } from 'zod';

export const DashboardResponseSchema = z.object({
  levelId: z.number().gt(0).lt(11),
  latestClass: z.number(),
  latestLink: z.string().url(),
});

export type DashboardResponse = z.infer<typeof DashboardResponseSchema>;
