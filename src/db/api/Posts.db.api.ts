import {
  IDbPostCreateArg,
  IDbPostCreateResult,
  IDbPostDeleteByIdArg,
  IDbPostDeleteByIdResult,
  IDbPostGetByIdArg,
  IDbPostGetByIdResult,
  IDbPostGetManyArg,
  IDbPostGetManyResult
} from "./Posts.db.api.types";
import {AppError} from "../../utils/AppError";
import {ErrorCode} from "../../utils/ErrorCode";
import {PostModel} from "../models/Post.model";
import {UserModel} from "../models/User.model";
import {CommentModel} from "../models/Comment.model";
import {DbClient} from "../DbClient";

export class PostsDbApi {
  public static async create(arg: IDbPostCreateArg): Promise<IDbPostCreateResult> {

    const user = await UserModel.findByPk(arg.author_id, {raw: true});

    if (!user) {
      throw new AppError(ErrorCode.NOT_FOUND, 'User not found');
    }

    let post = await PostModel.create({
      title: arg.title,
      body: arg.body,
      published_at: arg.published_at,
      author_id: arg.author_id,
    });
    post = post.toJSON();

    return {
      post: {
        id: post.id,
        title: post.title,
        body: post.body,
        published_at: post.published_at,
        author_nickname: user.nickname,
        comments: [],
      },
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

  public static async getById(arg: IDbPostGetByIdArg): Promise<IDbPostGetByIdResult> {

    let post = await PostModel.findByPk(arg.id, {
      include: {
        model: UserModel,
      }
    });

    if (!post) {
      throw new AppError(ErrorCode.NOT_FOUND, 'Post not found');
    }

    post = post.dataValues as PostModel;
    const author = post.author.dataValues;

    const comments = await CommentModel.findAll({
      where: {
        post_id: post.id,
      },
      limit: 10,
      order: [['published_at', 'DESC']],
      raw: true,
    });

    return {
      post: {
        id: post.id,
        title: post.title,
        body: post.body,
        author_nickname: author.nickname,
        published_at: post.published_at,
        comments: [],
      },
    };
  };

  public static async getMany(arg: IDbPostGetManyArg): Promise<IDbPostGetManyResult> {
    return {} as any;
  }

}