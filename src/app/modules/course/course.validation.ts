import { z } from 'zod';

const PreRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(255),
    prefix: z.string().min(2).max(10),
    code: z.number().int().positive(),
    credits: z.number().int().positive(),
    preRequisiteCourses: z.array(PreRequisiteCourseValidationSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(255).optional(),
    prefix: z.string().min(2).max(10).optional(),
    code: z.number().int().positive().optional(),
    credits: z.number().int().positive().optional(),
    preRequisiteCourses: z.array(PreRequisiteCourseValidationSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const facultiesToCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  facultiesToCourseValidationSchema,
};
