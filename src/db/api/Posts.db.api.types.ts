import {IDbComment} from "./Comments.db.api.types";


// create
export interface IDbPostCreateArg {
  title: string;
  body: string;
  published_at: Date;
  author_id: number;
}

export interface IDbPostCreateResult extends IDbPost{

}

// deleteById
export interface IDbPostDeleteByIdArg {
  id: number;
}

export interface IDbPostDeleteByIdResult {

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