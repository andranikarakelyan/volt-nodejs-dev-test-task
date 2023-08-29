import {IDbCommentCreateArg, IDbCommentCreateResult} from "./Comments.db.api.types";
import {UserModel} from "../models/User.model";
import {AppError} from "../../utils/AppError";
import {ErrorCode} from "../../utils/ErrorCode";
import {PostModel} from "../models/Post.model";
import {CommentModel} from "../models/Comment.model";

export class CommentsDbApi {
  public static async create(arg: IDbCommentCreateArg): Promise<IDbCommentCreateResult> {

    const author = await UserModel.findByPk(arg.author_id, {raw: true});

    if (!author) {
      throw new AppError(ErrorCode.NOT_FOUND, 'User not found');
    }

    const post = await PostModel.findByPk(arg.post_id, {raw: true});

    if (!post) {
      throw new AppError(ErrorCode.NOT_FOUND, 'Post not found');
    }

    let comment = await CommentModel.create({
      body: arg.body,
      published_at: arg.published_at,
      post_id: arg.post_id,
      author_id: arg.author_id,
    });
    comment = comment.toJSON();

    return {
      comment: {
        id: comment.id,
        body: comment.body,
        published_at: comment.published_at,
        author_nickname: author.nickname,
      },
    };

  }
}