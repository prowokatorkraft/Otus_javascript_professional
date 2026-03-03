import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const handleNotFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The requested endpoint ${req.originalUrl} does not exist`
  });
}

export const handleError = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
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