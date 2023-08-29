export interface IDbCommentCreateArg {
  post_id: number;
  author_id: number;
  body: string;
  published_at: Date,
}

export interface IDbCommentCreateResult {
  comment: IDbComment;
}

// common
export interface IDbComment {
  id: number
  body: string
  author_nickname: string
  published_at: Date
}