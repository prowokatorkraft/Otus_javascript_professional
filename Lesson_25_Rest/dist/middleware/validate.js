"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.validate = void 0;
const zod_1 = require("zod");
/**
 * Middleware для валидации запросов с Zod
 * @param schema Схема Zod для валидации
 * @param source Источник данных для валидации ('body', 'params', 'query')
 */
const validate = (schema, source = 'body') => {
    return async (req, res, next) => {
        try {
            const data = await schema.parseAsync(req[source]);
            //req.validated = data;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errors = error.issues.map(issue => ({
                    path: issue.path.join('.'),
                    message: issue.message
                }));
                return res.status(400).json({
                    error: 'Validation failed',
                    details: errors
                });
            }
            next(error);
        }
    };
};
exports.validate = validate;
/**
 * Обработчик ошибок
 */
const handleError = (error, req, res, next) => {
    if (error instanceof zod_1.ZodError) {
        return res.status(400).json({
            error: 'Validation error',
            issues: error.issues.map(err => ({
                path: err.path.join('.'),
                message: err.message
            }))
        });
    }
    console.error('Server error:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: error.message
    });
};
exports.handleError = handleError;
//# sourceMappingURL=validate.js.map