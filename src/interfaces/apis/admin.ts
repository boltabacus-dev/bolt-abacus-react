import { z } from 'zod';

const QuizQuestionSchema = z.object({
  questionId: z.number(),
  question: z.object({
    operator: z.string(),
    numbers: z.array(z.number()),
  }),
  correctAnswer: z.number(),
});
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

export const QuizQuestionsResponseSchema = z.object({
  questions: z.array(QuizQuestionSchema),
  time: z.number(),
  quizId: z.number(),
});
export type QuizQuestionsResponse = z.infer<typeof QuizQuestionsResponseSchema>;
