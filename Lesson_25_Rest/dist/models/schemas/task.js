"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskSchema = void 0;
const zod_1 = require("zod");
exports.taskSchema = {
    create: zod_1.z.object({
        title: zod_1.z.string()
            .min(1, 'Title is required')
            .max(255, 'Title cannot exceed 255 characters'),
        description: zod_1.z.string().optional(),
        completed: zod_1.z.boolean().default(false)
    }),
    update: zod_1.z.object({
        title: zod_1.z.string().min(1).optional(),
        description: zod_1.z.string().optional(),
        completed: zod_1.z.boolean().optional()
    }),
    params: zod_1.z.object({
        id: zod_1.z.coerce.number().int().positive('ID must be a positive number')
    })
};
//# sourceMappingURL=task.js.map