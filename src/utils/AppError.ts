import {ErrorCode} from "./ErrorCode";

export class AppError extends Error {
  public code: string

  public constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }

  public static fromError(error: Error): AppError {
    if (error instanceof AppError) {
      return error;
    }
    return new AppError((error as Error & { code: string }).code || 'UNEXPECTED', error.message);
  }

  /**
   * Returns corresponding http status code,
   * By default returns 500
   */
  get httpStatus(): number {
    switch (this.code) {
      case ErrorCode.FORBIDDEN:
        return 403;
      case ErrorCode.NOT_FOUND:
        return 404;
      default:
        return 500;
    }
  }

}