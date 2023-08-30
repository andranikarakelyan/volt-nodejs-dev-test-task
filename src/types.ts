export interface IAppReqContext {
  auth_token?: string;
  auth_user_id?: number;
}

export interface IJwtTokenPayload {
  user_id: number;
}

declare global {
  namespace Express {
    export interface Request {
      context?: IAppReqContext;
    }
  }
}