import {ILoginArg, ILoginResult} from "./auth.types";
import {UsersDbApi} from "../../db/api/Users.db.api";
import * as jwt from "jsonwebtoken";
import {AppConfig} from "../../config";
import {IResolverArg} from "../types";
import {IJwtTokenPayload} from "../../types";

export const AuthResolvers = {
  mutations: {
    async login(parent: unknown, {arg}: IResolverArg<ILoginArg>  ): Promise<ILoginResult> {
      const user = await UsersDbApi.getByEmailPassword({
        email: arg.email,
        password: arg.password,
      });

      const payload: IJwtTokenPayload = {
        user_id: user.id,
      };
      return {
        token: jwt.sign(payload, AppConfig.jwt_secret, { expiresIn: '7d' }),
      };
    }
  },
  queries: {},
};