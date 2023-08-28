import {IDbComment} from "./Comments.db.api.types";

export interface IDbPostCreateArg {
  title: string;
  body: string;
  published_at: Date;
  author_id: number;
}

export interface IDbPostCreateResult extends IDbPost{

}

export interface IDbPost {
  id: number;
  title: string;
  body: string;
  published_at: Date;
  author_nickname: string;
  comments: IDbComment[]
}