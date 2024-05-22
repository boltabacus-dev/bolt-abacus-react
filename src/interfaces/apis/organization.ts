import { z } from 'zod';

// Get All TagNames API Response
export const GetAllTagNamesResponseSchema = z.object({
  tagNames: z.array(z.string()),
});
export type GetAllTagNamesResponse = z.infer<
  typeof GetAllTagNamesResponseSchema
>;

export const TagDetailsSchema = z.object({
  tagId: z.number(),
  organizationName: z.string(),
  tagName: z.string(),
  isIndividualTeacher: z.boolean(),
  numberOfTeachers: z.number(),
  numberOfStudents: z.number(),
  expirationDate: z.string(),
  totalNumberOfStudents: z.number(),
  maxLevel: z.number(),
  maxClass: z.number(),
});
export type TagDetails = z.infer<typeof TagDetailsSchema>;

// Get Tag Details API Response
export const GetTagDetailsResponseSchema = TagDetailsSchema;

export type GetTagDetailsResponse = z.infer<typeof GetTagDetailsResponseSchema>;
