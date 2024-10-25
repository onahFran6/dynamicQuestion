import { ErrorType } from 'src/types/errorTypes';

export class CustomError extends Error {
  public statusCode: number;
  public errorType: ErrorType;

  constructor(message: string, statusCode: number, errorType: ErrorType) {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType;
    Error.captureStackTrace(this, this.constructor);
  }
}
