import {Request, Response} from "express";
import {AppError} from "../utils/AppError";
import {CloudStorageClient} from "../cloud_storage/CloudStorage.client";
import {ErrorCode} from "../utils/ErrorCode";

export function avatarsUpload(req: Request, res: Response){
  // To not implement login feature in frontend imitate authenticated user
  //FIXME: Remove this code after implementing login feature in frontend side
  req.context = {
    auth_user_id: Math.ceil(Math.random() * 100),
  };

  if (!req.context?.auth_user_id) {
    throw new AppError(ErrorCode.UNAUTHORIZED, 'Authentication is required to access this resource.')
  }

  CloudStorageClient.upload({
    file: req.file?.buffer as Buffer,
    path: `user-${req.context?.auth_user_id}-avatar.jpg`,
  })
    .then(({url}) => {
      res.status(200).json({
        url,
      });
    })
    .catch((err) => {
      console.log('AWS: Uploaded error', err);
      res.status(200).json({
        status: 'success',
      });
    });
}