import { z } from 'zod';

// Dashboard Page API Response
export const DashboardResponseSchema = z.object({
  levelId: z.number().gt(0).lt(11),
  latestClass: z.number(),
  latestLink: z.string().url(),
});
export type DashboardResponse = z.infer<typeof DashboardResponseSchema>;

// Dashboard Page V2 API Response
export const DashboardResponseV2Schema = z.object({
  levelsPercentage: z.record(z.number()),
  levelId: z.number().gt(0).lt(11),
  latestClass: z.number(),
  latestLink: z.string().url(),
});
export type DashboardResponseV2 = z.infer<typeof DashboardResponseV2Schema>;

export type LevelsPercentage = {
  [key: string]: number;
};

// Level Page API Response
const SingleClassSchema = z.object({
  classId: z.number(),
  topicIds: z.array(z.number()),
});
export type ClassSchema = z.infer<typeof SingleClassSchema>;

const ProgressSchema = z.object({
  topicId: z.number(),
  QuizType: z.enum(['Homework', 'Classwork', 'Test']),
  isPass: z.boolean(),
  percentage: z.number(),
});
export type ClassProgress = z.infer<typeof ProgressSchema>;

export const LevelResponseSchema = z.object({
  isLatestLevel: z.boolean(),
  latestClass: z.number(),
  schema: z.array(SingleClassSchema),
  progress: z.array(ProgressSchema),
});
export type LevelResponse = z.infer<typeof LevelResponseSchema>;

// Level Page V2 API Response
const QuizResultV2Schema = z.object({
  percentage: z.number(),
  time: z.number(),
});
export type QuizResultV2 = z.infer<typeof QuizResultV2Schema>;

const TopicProgressV2Schema = z.object({
  Homework: QuizResultV2Schema.optional(),
  Classwork: QuizResultV2Schema.optional(),
  Test: QuizResultV2Schema.optional(),
});
export type TopicProgressV2 = z.infer<typeof TopicProgressV2Schema>;

const ProgressV2Schema = z.object({
  classId: z.number(),
  topics: z.record(TopicProgressV2Schema),
});
export type ClassProgressV2 = z.infer<typeof ProgressV2Schema>;

export const LevelResponseV2Schema = z.object({
  progress: z.array(ProgressV2Schema),
  finalTest: QuizResultV2Schema,
  oralTest: QuizResultV2Schema,
});
export type LevelResponseV2 = z.infer<typeof LevelResponseV2Schema>;

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
  quizId: z.number(),
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
  time: z.number(),
});
export type QuizResult = z.infer<typeof QuizResultSchema>;

// Report Page API Response
export const QuizReportSchema = z.object({
  topicId: z.number(),
  Classwork: z.number(),
  ClassworkTime: z.number(),
  Homework: z.number(),
  HomeworkTime: z.number(),
});
export type QuizReport = z.infer<typeof QuizReportSchema>;

export const TestReportSchema = z.object({
  Test: z.number(),
  Time: z.number(),
});
export type TestReport = z.infer<typeof TestReportSchema>;

export const ClassReportSchema = z.object({
  quiz: z.array(QuizReportSchema),
  test: TestReportSchema,
});
export type ClassReport = z.infer<typeof ClassReportSchema>;
