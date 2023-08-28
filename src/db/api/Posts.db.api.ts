import {
  IDbPostCreateArg,
  IDbPostCreateResult,
  IDbPostDeleteByIdArg,
  IDbPostDeleteByIdResult
} from "./Posts.db.api.types";
import {AppError} from "../../utils/AppError";
import {ErrorCode} from "../../utils/ErrorCode";
import {PostModel} from "../models/Post.model";
import {UserModel} from "../models/User.model";

export class PostsDbApi {
  public static async create(arg: IDbPostCreateArg): Promise<IDbPostCreateResult> {

    const user = await UserModel.findByPk(arg.author_id, { raw: true});

    if (!user) {
      throw new AppError( ErrorCode.NOT_FOUND, 'User not found' );
    }

    let post = await PostModel.create({
      title: arg.title,
      body: arg.body,
      published_at: arg.published_at,
      author_id: arg.author_id,
    });
    post = post.toJSON();

    return {
      id: post.id,
      title: post.title,
      body: post.body,
      published_at: post.published_at,
      author_nickname: user.nickname,
      comments: [],
    };
  }

  public static async deleteById(arg: IDbPostDeleteByIdArg): Promise<IDbPostDeleteByIdResult> {

    await PostModel.destroy({
      where: {
        id: arg.id,
      },
    });

    return {};

  }
}