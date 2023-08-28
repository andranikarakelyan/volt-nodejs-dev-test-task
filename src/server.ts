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

export async function startServer() {

  const app = express();
  const httpServer = http.createServer(app);

  app.use(express.static('public'));
  app.use(cors());
  app.use(bodyParser.json());

  app.use('/api/graphql', expressMiddleware(
    await initApolloServer(httpServer),
    {
      context: async ({req, res}) => {
        const auth_token = req.headers.authorization;
        let auth_user;

        if (auth_token) {
          auth_user = await new Promise((resolve, reject) => {
            jwt.verify(auth_token.trim(), AppConfig.jwt_secret, (error, decoded) => {
              if (error) {
                reject( new AppError('FORBIDDEN', 'Invalid token') );
              }
              resolve(decoded);
            });
          });
        }

        return {
          auth_token,
          auth_user,
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
