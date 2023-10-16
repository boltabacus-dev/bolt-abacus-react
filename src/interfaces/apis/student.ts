import { z } from 'zod';

export const DashboardResponseSchema = z.object({
  levelId: z.number().gt(0).lt(11),
  latestClass: z.number(),
  latestLink: z.string().url(),
});
export type DashboardResponse = z.infer<typeof DashboardResponseSchema>;

const SingleClassSchema = z.object({
  classId: z.number(),
  topicIds: z.array(z.number()),
});
export type ClassSchema = z.infer<typeof SingleClassSchema>;

const ProgressSchema = z.object({
  topicId: z.number(),
  QuizType: z.enum(['HomeWork', 'Classwork']),
  isPass: z.boolean(),
});
export type ClassProgress = z.infer<typeof ProgressSchema>;

export const LevelResponseSchema = z.object({
  isLatestLevel: z.boolean(),
  latestClass: z.number(),
  schema: z.array(SingleClassSchema),
  progress: z.array(ProgressSchema),
});
export type LevelResponse = z.infer<typeof LevelResponseSchema>;
