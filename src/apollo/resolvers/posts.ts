import {AppError} from "../../utils/AppError";
import {ErrorCode} from "../../utils/ErrorCode";
import {PostsDbApi} from "../../db/api/Posts.db.api";
import {IResolverArg} from "../types";
import {IAppReqContext} from "../../types";
import {IDeletePostArg, IDeletePostResult, IPublishPostArg, IPublishPostResult} from './posts.types';

export const PostResolvers = {
  mutations: {
    async publishPost(
      parent: unknown,
      {arg}: IResolverArg<IPublishPostArg>,
      context: IAppReqContext
    ): Promise<IPublishPostResult> {

      if (!context.auth_user_id) {
        throw new AppError(ErrorCode.FORBIDDEN, `You haven't permission to perform this operation`);
      }

      const post = await PostsDbApi.create({
        title: arg.title,
        body: arg.body,
        published_at: arg.published_at ? new Date(arg.published_at) : new Date(),
        author_id: context.auth_user_id,
      });

      return {
        post: {
          id: post.id,
          title: post.title,
          body: post.body,
          published_at: post.published_at,
          author_nickname: post.author_nickname,
          comments: post.comments,
        },
      };

    },
    async deletePost(
      parent: unknown,
      {arg}: IResolverArg<IDeletePostArg>,
      context: IAppReqContext,
    ): Promise<IDeletePostResult> {
      await PostsDbApi.deleteById({id: arg.id});
      return {};
    },
  },
  queries: {},
};