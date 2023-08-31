import express, {NextFunction, Request, Response} from 'express';
import {AppError} from "./utils/AppError";
import {AppConfig} from "./config";
import * as http from "http";
import cors from 'cors';
import bodyParser from "body-parser";
import {ErrorCode} from "./utils/ErrorCode";
import multer from "multer";
import {authMiddleware} from "./middlewares/auth";
import {avatarsUploadRoute} from "./routes/avatars.upload.route";
import morgan from 'morgan';
import {statusRoute} from "./routes/status.route";
import {getApolloServer} from "./apollo/apollo";

const app = express();
const httpServer = http.createServer(app);

export async function startServer() {

  app.use(express.static('public'));
  app.use(cors());
  app.use(bodyParser.json());
  app.use(authMiddleware);
  app.use(morgan('combined'))

  app.post('/api/avatars/upload', multer().single('avatar'), avatarsUploadRoute);
  app.get('/api/status', statusRoute);
  app.use('/api/graphql', await getApolloServer(httpServer));


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

  await new Promise(resolve => httpServer.listen(AppConfig.server_port, resolve as () => void));
  console.log(`Server listening on port ${AppConfig.server_port}`);

}

export {httpServer};