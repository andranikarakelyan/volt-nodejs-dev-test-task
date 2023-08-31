import {NextFunction, Request, Response} from "express";
import {AppError} from "../utils/AppError";

export function errorHandlingMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  const app_error = AppError.fromError(err);
  res
    .status(app_error.httpStatus)
    .json({
      errors: [{
        code: app_error.code,
        message: app_error.message,
      }],
    });
}