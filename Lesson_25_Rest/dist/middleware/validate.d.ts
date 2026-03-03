import { Request, Response, NextFunction } from 'express';
import { ZodObject } from 'zod';
/**
 * Middleware для валидации запросов с Zod
 * @param schema Схема Zod для валидации
 * @param source Источник данных для валидации ('body', 'params', 'query')
 */
export declare const validate: (schema: ZodObject, source?: "body" | "params" | "query") => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Обработчик ошибок
 */
export declare const handleError: (error: any, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=validate.d.ts.map