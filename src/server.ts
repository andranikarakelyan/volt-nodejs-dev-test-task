import express, {NextFunction, Request, Response} from 'express';
import {AppError} from "./utils/AppError";
import {AppConfig} from "./config";

import * as http from "http";
import {ApolloServer} from "@apollo/server";
import cors from 'cors';
import bodyParser from "body-parser";
import {expressMiddleware} from "@apollo/server/express4";
import {initApolloServer} from "./apollo/server";

export async function startServer() {

  const app = express();
  const httpServer = http.createServer( app );

  app.use(express.static('public'));
  app.use(cors());
  app.use(bodyParser.json());

  app.use('/api', expressMiddleware(await initApolloServer(httpServer)));

  app.get('/api/status', (req: Request, res: Response) => {
    return res.json({
      status: 'success',
    });
  });

  app.use('*', (req: Request, res: Response) => {
    throw new AppError('NOT_FOUND', `Path '${req.originalUrl}' not found`);
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res
      .status(500)
      .json({
        status: 'error',
        error: {
          code: (err as Error & { code: unknown }).code || 'UNEXPECTED',
          message: err.message,
        },
      });
  });

  await new Promise(resolve => app.listen(AppConfig.server_port, resolve as () => void));
  console.log(`Server listening on port ${AppConfig.server_port}`);

}




