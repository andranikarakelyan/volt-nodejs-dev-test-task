import {IDbPostCreateArg, IDbPostCreateResult} from "./Posts.db.api.types";
import {AppError} from "../../utils/AppError";

export class PostsDbApi {
  public static async create(arg: IDbPostCreateArg): Promise<IDbPostCreateResult> {
    throw new AppError('NOT_IMPLEMENTED', 'Not implemented');
  }
}