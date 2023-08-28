export interface IAppReqContext {
  auth_token: string | undefined;
  auth_user_id: number | undefined;
}

export interface IJwtTokenPayload {
  user_id: number;
}