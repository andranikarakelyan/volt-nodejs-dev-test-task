import {AppError} from "../../utils/AppError";
import {ErrorCode} from "../../utils/ErrorCode";
import {PostsDbApi} from "../../db/api/Posts.db.api";
import {IResolverArg} from "../types";
import {IAppReqContext} from "../../types";
import {
  ESortOrder,
  IDeletePostArg,
  IDeletePostResult,
  IGetPostByIdArg,
  IGetPostByIdResult,
  IGetPostsArgs,
  IGetPostsResult,
  IPublishPostArg,
  IPublishPostResult
} from './posts.types';

export const PostResolvers = {
  mutations: {
    async publishPost(
      parent: unknown,
      {arg}: IResolverArg<IPublishPostArg>,
      context: IAppReqContext
    ): Promise<IPublishPostResult> {

      if (!context.auth_user_id) {
        throw new AppError(ErrorCode.UNAUTHORIZED, `Authentication is required to access this resource.`);
      }

      const {post} = await PostsDbApi.create({
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
  queries: {
    async getPostById(
      parent: unknown,
      {arg}: IResolverArg<IGetPostByIdArg>
    ): Promise<IGetPostByIdResult> {
      const {post} = await PostsDbApi.getById({id: arg.id});

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
    async getPosts(
      parent: unknown,
      {arg}: IResolverArg<IGetPostsArgs>,
    ): Promise<IGetPostsResult> {
      const {
        posts, all_pages_count, is_last_page, all_records_count
      } = await PostsDbApi.getMany({
        sort_order: arg.sort_order || ESortOrder.ASC,
        has_comments: arg.has_comments,
        published_after: arg.published_after ? new Date(arg.published_after) : undefined,
        page: arg.page || 1,
        per_page: arg.per_page || 10,
      });

      return {
        posts: posts.map(p => ({
          id: p.id,
          title: p.title,
          body: p.body,
          published_at: p.published_at,
          author_nickname: p.author_nickname,
          comments: p.comments.map(p => ({
            id: p.id,
            body: p.body,
            published_at: p.published_at,
            author_nickname: p.author_nickname,
          })),
        })),
        all_pages_count,
        all_records_count,
        is_last_page,
      };
    }
  },
};