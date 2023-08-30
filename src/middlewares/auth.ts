import {NextFunction, Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import {AppConfig} from "../config";
import {AppError} from "../utils/AppError";
import {ErrorCode} from "../utils/ErrorCode";
import {IJwtTokenPayload} from "../types";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth_token = req.headers.authorization;

  if (!auth_token) {
    return next();
  }

  jwt.verify(auth_token.trim(), AppConfig.jwt_secret, (error, decoded) => {
    if (error || !decoded) {
      return next(new AppError(ErrorCode.INVALID_TOKEN, 'The provided authentication token is invalid.'));
    }
    req.context = {
      auth_token,
      auth_user_id: (decoded as IJwtTokenPayload).user_id,
    };
    return next();
  });

}