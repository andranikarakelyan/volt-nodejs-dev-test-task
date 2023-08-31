import {ErrorCode} from "./ErrorCode";
import {GraphQLError} from "graphql/error";

export class AppError extends GraphQLError {
  public code: string

  public constructor(code: string, message: string) {
    super(message, { extensions: { code: code } });
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
      case ErrorCode.UNAUTHORIZED:
      case ErrorCode.INVALID_TOKEN:
        return 401;
      case ErrorCode.NOT_FOUND:
        return 404;
      default:
        return 500;
    }
  }

}