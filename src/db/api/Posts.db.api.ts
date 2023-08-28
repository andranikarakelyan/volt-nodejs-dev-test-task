import {IDbPostCreateArg, IDbPostCreateResult} from "./Posts.db.api.types";
import {AppError} from "../../utils/AppError";
import {ErrorCode} from "../../utils/ErrorCode";

export class PostsDbApi {
  public static async create(arg: IDbPostCreateArg): Promise<IDbPostCreateResult> {
    throw new AppError(ErrorCode.NOT_IMPLEMENTED, 'Not implemented');
  }
}