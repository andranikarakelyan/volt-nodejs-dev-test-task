import {IDbComment} from "./Comments.db.api.types";


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


// common
export interface IDbPost {
  id: number;
  title: string;
  body: string;
  published_at: Date;
  author_nickname: string;
  comments: IDbComment[]
}