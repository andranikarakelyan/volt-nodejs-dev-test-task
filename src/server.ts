import express, {NextFunction, Request, Response} from 'express';
import {AppError} from "./utils/AppError";
import {AppConfig} from "./config";
import * as http from "http";
import cors from 'cors';
import bodyParser from "body-parser";
import {expressMiddleware} from "@apollo/server/express4";
import {initApolloServer} from "./apollo/server";
import * as jwt from 'jsonwebtoken';
import {ErrorCode} from "./utils/ErrorCode";
import {IAppReqContext, IJwtTokenPayload} from "./types";
import multer from "multer";

export async function startServer() {

  const app = express();
  const httpServer = http.createServer(app);

  app.use(express.static('public'));
  app.use(cors());
  app.use(bodyParser.json());

  app.post('/api/avatars/upload', multer().single('avatar'), (req, res) => {
    res.status(200).json({
      status: 'success',
    });
  });

  app.use('/api/graphql', expressMiddleware(
    await initApolloServer(httpServer),
    {
      context: async ({req, res}): Promise<IAppReqContext> => {
        const auth_token = req.headers.authorization;
        let auth_user_id: undefined | number;

        if (auth_token) {
          auth_user_id = await new Promise((resolve, reject) => {
            jwt.verify(auth_token.trim(), AppConfig.jwt_secret, (error, decoded) => {
              if (error || !decoded) {
                return reject( new AppError(ErrorCode.INVALID_TOKEN, 'The provided authentication token is invalid.') );
              }
              // TODO: Decide, do I need to check user in database
              resolve((decoded as IJwtTokenPayload).user_id);
            });
          });
        }

        return {
          auth_token,
          auth_user_id,
        };
      }
    }
  ));

  app.get('/api/status', (req: Request, res: Response) => {
    return res.json({
      status: 'success',
    });
  });

  app.use('*', (req: Request, res: Response) => {
    throw new AppError(ErrorCode.NOT_FOUND, `Path '${req.originalUrl}' not found`);
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const app_error = AppError.fromError(err);
    res
      .status(app_error.httpStatus)
      .json({
        errors: [{
          code: app_error.code,
          message: app_error.message,
        }],
      });
  });

  await new Promise(resolve => app.listen(AppConfig.server_port, resolve as () => void));
  console.log(`Server listening on port ${AppConfig.server_port}`);

}
