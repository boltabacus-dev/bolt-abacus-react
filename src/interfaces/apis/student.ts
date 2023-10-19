import { z } from 'zod';

// Dashboard Page API Response
export const DashboardResponseSchema = z.object({
  levelId: z.number().gt(0).lt(11),
  latestClass: z.number(),
  latestLink: z.string().url(),
});
export type DashboardResponse = z.infer<typeof DashboardResponseSchema>;

// Level Page API Response
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

// Quiz Page API Response

const QuizQuestionSchema = z.object({
  questionId: z.number(),
  question: z.object({
    operator: z.string(),
    numbers: z.array(z.number()),
  }),
});
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

export const QuizResponseSchema = z.object({
  questions: z.array(QuizQuestionSchema),
  time: z.number(),
  // quizId: z.number(),
});
export type QuizResponse = z.infer<typeof QuizResponseSchema>;

export const QuizAnswerSchema = z.object({
  questionId: z.number(),
  answer: z.number().nullable(),
});
export type QuizAnswer = z.infer<typeof QuizAnswerSchema>;

const QuestionResultSchema = z.object({
  question: z.string(),
  verdict: z.boolean(),
  answer: z.number().nullable(),
});
export type QuestionResult = z.infer<typeof QuestionResultSchema>;

export const QuizResultSchema = z.object({
  results: z.array(QuestionResultSchema),
  pass: z.boolean(),
  // time: z.number()
});
export type QuizResult = z.infer<typeof QuizResultSchema>;
