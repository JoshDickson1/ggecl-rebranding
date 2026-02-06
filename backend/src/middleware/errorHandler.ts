import { Request, Response, NextFunction } from "express";
import { AppError } from "../lib/AppError";

// Error handler middleware
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log error for debugging
  console.error('Error:', {
    name: err.name,
    message: err.message,
    code: (err as AppError).errorCode,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
  });

  // Handle operational errors (our custom errors)
  if (err instanceof AppError && err.isOperational) {
    res.status(err.statusCode).json({
      error: {
        name: err.name,
        message: err.message,
        code: err.errorCode,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
      },
    });
    return;
  }

  // Handle Multer file upload errors
  if (err.name === 'MulterError') {
    res.status(400).json({
      error: {
        name: 'FileUploadError',
        message: err.message,
        code: 'FILE_UPLOAD_ERROR',
      },
    });
    return;
  }

  // Handle programming/unknown errors
  res.status(500).json({
    error: {
      message: process.env.NODE_ENV === 'development'
        ? err.message
        : 'An unexpected error occurred',
      code: 'INTERNAL_SERVER_ERROR',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({
    error: {
      message: `Route ${req.originalUrl} not found`,
      code: 'NOT_FOUND',
    },
  });
};