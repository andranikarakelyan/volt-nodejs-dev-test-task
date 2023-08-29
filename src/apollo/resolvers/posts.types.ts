// publishPost
import {IComment} from "./comments.types";

export interface IPublishPostArg {
  title: string
  body: string
  published_at: Date | undefined | null
}

export interface IPublishPostResult {
  post: IPost
}

// deletePost
export interface IDeletePostArg {
  id: number;
}

export interface IDeletePostResult {
}

// getPostById
export interface IGetPostByIdArg {
  id: number;
}

export interface IGetPostByIdResult {
  post: IPost;
}

// getPosts
export interface IGetPostsArgs {
  sort_order?: ESortOrder;
  has_comments?: boolean;
  published_after?: Date;
  page?: number;
  per_page?: number;
}

export interface IGetPostsResult {
  posts: IPost[];
  all_pages_count: number;
  all_records_count: number;
  is_last_page: boolean;
}

// common
export interface IPost {
  id: number
  title: string
  body: string
  published_at: Date
  author_nickname: string
  comments: IComment[]
}

export enum ESortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}