import express, {NextFunction, Request, Response} from 'express';
import {AppError} from "./utils/AppError";
import {AppConfig} from "./config";
import * as http from "http";
import cors from 'cors';
import bodyParser from "body-parser";
import {expressMiddleware} from "@apollo/server/express4";
import {initApolloServer} from "./apollo/server";
import {ErrorCode} from "./utils/ErrorCode";
import {IAppReqContext, IJwtTokenPayload} from "./types";
import multer from "multer";
import {authMiddleware} from "./middlewares/auth";
import {avatarsUpload} from "./routes/avatars.upload";

export async function startServer() {

  const app = express();
  const httpServer = http.createServer(app);

  app.use(express.static('public'));
  app.use(cors());
  app.use(bodyParser.json());
  app.use(authMiddleware);

  app.post('/api/avatars/upload', multer().single('avatar'), avatarsUpload);

  app.use('/api/graphql', expressMiddleware(
    await initApolloServer(httpServer),
    {
      context: async ({req, res}): Promise<IAppReqContext> => {
        return (req as Request & { context?: IAppReqContext }).context || {};
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
