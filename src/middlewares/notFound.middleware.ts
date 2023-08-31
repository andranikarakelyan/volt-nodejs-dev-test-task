import {Request, Response} from "express";
import {AppError} from "../utils/AppError";
import {ErrorCode} from "../utils/ErrorCode";

export function notFoundMiddleware(req: Request, res: Response) {
  throw new AppError(ErrorCode.NOT_FOUND, `Path '${req.originalUrl}' not found`);
}