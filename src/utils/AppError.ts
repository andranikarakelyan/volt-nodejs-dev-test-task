export class AppError extends Error {
  public code: string

  public constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}