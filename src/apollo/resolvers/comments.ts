import {IResolverArg} from "../types";
import {IAppReqContext} from "../../types";
import {CommentsDbApi} from "../../db/api/Comments.db.api";
import {AppError} from "../../utils/AppError";
import {ErrorCode} from "../../utils/ErrorCode";
import {IPublishCommentArg, IPublishCommentResult} from "./comments.types";

export const CommentResolvers = {
  mutations: {
    async publishComment(
      parent: unknown,
      {arg}: IResolverArg<IPublishCommentArg>,
      context: IAppReqContext,
    ): Promise<IPublishCommentResult> {

      if (!context.auth_user_id) {
        throw new AppError(ErrorCode.UNAUTHORIZED, 'Authentication is required to access this resource');
      }

      const {comment} = await CommentsDbApi.create({
        body: arg.body,
        published_at: arg.published_at ? new Date(arg.published_at) : new Date(),
        author_id: context.auth_user_id,
        post_id: arg.post_id,
      });

      return {
        comment: {
          id: comment.id,
          body: comment.body,
          published_at: comment.published_at,
          author_nickname: comment.author_nickname,
        },
      };
    }
  },
  queries: {},
};