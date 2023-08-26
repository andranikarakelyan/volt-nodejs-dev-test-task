import express, {NextFunction, Request, Response} from 'express';
import {AppError} from "./utils/AppError";

const PORT = 3000;

export async function startServer() {

  const app = express();

  app.use(express.static('public'));

  app.get('/api', (req: Request, res: Response) => {
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

  await new Promise(resolve => app.listen(PORT, resolve as () => void));
  console.log(`Server listening on port ${PORT}`);

}




