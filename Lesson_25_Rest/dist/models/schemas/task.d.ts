import { z } from 'zod';
export declare const taskSchema: {
    create: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        completed: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>;
    update: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        completed: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodCoercedNumber<unknown>;
    }, z.core.$strip>;
};
export type CreateTaskSchema = z.infer<typeof taskSchema.create>;
export type UpdateTaskSchema = z.infer<typeof taskSchema.update>;
//# sourceMappingURL=task.d.ts.map