// Base custom error class
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly errorCode: string | null;
    public readonly isOperational: boolean;
  
    constructor(message: string, statusCode: number, errorCode: string | null = null) {
      super(message);
      this.statusCode = statusCode;
      this.errorCode = errorCode;
      this.isOperational = true; // Distinguish operational errors from programming errors
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  // Specific error types
  export class ValidationError extends AppError {
    constructor(message: string, errorCode: string = 'VALIDATION_ERROR') {
      super(message, 400, errorCode);
      this.name = 'ValidationError';
    }
  }
  
  export class AuthenticationError extends AppError {
    constructor(message: string = 'Authentication failed', errorCode: string = 'AUTH_ERROR') {
      super(message, 401, errorCode);
      this.name = 'AuthenticationError';
    }
  }
  
  export class APIError extends AppError {
    constructor(message: string = 'API request failed', statusCode: number = 500, errorCode: string = 'API_ERROR') {
      super(message, statusCode, errorCode);
      this.name = 'APIError';
    }
  }
  
  export class AuthorizationError extends AppError {
    constructor(message: string = 'Access denied', errorCode: string = 'FORBIDDEN') {
      super(message, 403, errorCode);
      this.name = 'AuthorizationError';
    }
  }
  
  export class NotFoundError extends AppError {
    constructor(resource: string = 'Resource', errorCode: string = 'NOT_FOUND') {
      super(`${resource} not found`, 404, errorCode);
      this.name = 'NotFoundError';
    }
  }
  
  export class ConflictError extends AppError {
    constructor(message: string, errorCode: string = 'CONFLICT') {
      super(message, 409, errorCode);
      this.name = 'ConflictError';
    }
  }
  
  export class DatabaseError extends AppError {
    constructor(message: string = 'Database operation failed', errorCode: string = 'DB_ERROR') {
      super(message, 500, errorCode);
      this.name = 'DatabaseError';
    }
  }
  
  export class ExternalServiceError extends AppError {
    constructor(service: string, message: string = 'External service error', errorCode: string = 'SERVICE_ERROR') {
      super(`${service}: ${message}`, 503, errorCode);
      this.name = 'ExternalServiceError';
    }
  }
  
  export class RateLimitError extends AppError {
    constructor(message: string = 'Too many requests', errorCode: string = 'RATE_LIMIT_EXCEEDED') {
      super(message, 429, errorCode);
      this.name = 'RateLimitError';
    }
  }
  
  export class FileUploadError extends AppError {
    constructor(message: string = 'File upload failed', errorCode: string = 'FILE_UPLOAD_ERROR') {
      super(message, 400, errorCode);
      this.name = 'FileUploadError';
    }
  }
  
  export class BadRequestError extends AppError {
    constructor(message: string = 'Bad request', errorCode: string = 'BAD_REQUEST') {
      super(message, 400, errorCode);
      this.name = 'BadRequestError';
    }
  }