import { z } from 'zod';

// Get All Quiz Question API

const QuizQuestionSchema = z.object({
  questionId: z.number(),
  question: z.object({
    operator: z.string(),
    numbers: z.array(z.number()),
  }),
  correctAnswer: z.number(),
});
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

const QuizQuestionsResponseSchema = z.object({
  questions: z.array(QuizQuestionSchema),
  time: z.number(),
  quizId: z.number(),
});
export type QuizQuestionsResponse = z.infer<typeof QuizQuestionsResponseSchema>;

// Get Level Schema API

const ClassSchemaSchema = z.object({
  classId: z.number(),
  topicIds: z.array(z.number()),
});
export type ClassSchema = z.infer<typeof ClassSchemaSchema>;

const GetLevelSchemaResponseSchema = z.object({
  schema: z.array(ClassSchemaSchema),
});
export type GetLevelSchemaResponse = z.infer<
  typeof GetLevelSchemaResponseSchema
>;
