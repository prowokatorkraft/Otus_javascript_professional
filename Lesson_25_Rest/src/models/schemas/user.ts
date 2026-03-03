import { z } from 'zod';

export const userSchema = {
  create: z.object({
    name: z.string()
      .min(1, 'Name is required')
      .max(50, 'Name cannot exceed 50 characters'),
    age: z.coerce.number().int().positive('Age must be a positive number')
  }),

  update: z.object({
    id: z.coerce.number().int().positive('ID must be a positive number'),
    name: z.string()
      .min(1, 'Name is required')
      .max(50, 'Name cannot exceed 50 characters'),
    age: z.coerce.number().int().positive('Age must be a positive number')
  }),

  params: z.object({
    id: z.coerce.number().int().positive('ID must be a positive number')
  })
};
