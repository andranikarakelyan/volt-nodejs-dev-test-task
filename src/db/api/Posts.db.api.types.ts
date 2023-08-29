import {IDbComment} from "./Comments.db.api.types";
import {ESortOrder} from "../../apollo/resolvers/posts.types";


// create
export interface IDbPostCreateArg {
  title: string;
  body: string;
  published_at: Date;
  author_id: number;
}

export interface IDbPostCreateResult {
  post: IDbPost;
}

// deleteById
export interface IDbPostDeleteByIdArg {
  id: number;
}

export interface IDbPostDeleteByIdResult {

}

// getById
export interface IDbPostGetByIdArg {
  id: number;
}

export interface IDbPostGetByIdResult {
  post: IDbPost;
}

// getMany
export interface IDbPostGetManyArg {
  ids?: number[];
  sort_order?: ESortOrder;
  has_comments?: boolean;
  published_after?: Date;
  page?: number;
  per_page?: number;
}

export interface IDbPostGetManyResult {
  posts: IDbPost[];
  all_pages_count: number;
  all_records_count: number;
  is_last_page: boolean;
}


// common
export interface IDbPost {
  id: number;
  title: string;
  body: string;
  published_at: Date;
  author_nickname: string;
  comments: IDbComment[]
}