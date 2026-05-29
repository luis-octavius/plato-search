import { Request, Response, NextFunction } from 'express';

export interface ErrorResponseBody {
  success: false;
  error: string;
  details?: string;
  statusCode: number;
}

/**
 * Global error handler middleware
 * Catches all errors and returns standardized error responses
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response<ErrorResponseBody>,
  next: NextFunction
) => {
  console.error('Error:', err);

  const statusCode = (err as any).statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
    statusCode,
  });
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.path}`,
    statusCode: 404,
  });
};
