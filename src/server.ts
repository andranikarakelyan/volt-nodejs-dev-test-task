import express from 'express';
import {AppConfig} from "./config";
import * as http from "http";
import cors from 'cors';
import bodyParser from "body-parser";
import multer from "multer";
import {avatarsUploadRoute} from "./routes/avatars.upload.route";
import morgan from 'morgan';
import {statusRoute} from "./routes/status.route";
import {getApolloServer} from "./apollo/apollo";
import {notFoundMiddleware} from "./middlewares/notFound.middleware";
import {errorHandlingMiddleware} from "./middlewares/errorHandling.middleware";
import {authMiddleware} from "./middlewares/auth.middleware";

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
  app.use('*', notFoundMiddleware);
  app.use(errorHandlingMiddleware);

  await new Promise(resolve => httpServer.listen(AppConfig.server_port, resolve as () => void));
  console.log(`Server listening on port ${AppConfig.server_port}`);

}

export {httpServer};