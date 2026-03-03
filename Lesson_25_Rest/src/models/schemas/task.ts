import { z } from 'zod';

export const taskSchema = {
  create: z.object({
    title: z.string()
      .min(1, 'Title is required')
      .max(255, 'Title cannot exceed 255 characters'),
    completed: z.boolean().default(false)
  }),

  update: z.object({
    id: z.coerce.number().int().positive('ID must be a positive number'),
    title: z.string()
      .min(1, 'Title is required')
      .max(255, 'Title cannot exceed 255 characters'),
    completed: z.boolean().optional()
  }),

  params: z.object({
    id: z.coerce.number().int().positive('ID must be a positive number')
  })
};
