// publish post
export interface IPublishCommentArg {
  post_id: number;
  body: string;
  published_at: Date | undefined,
}

export interface IPublishCommentResult {
  comment: IComment;
}

// common
export interface IComment {
  id: number
  body: string
  author_nickname: string
  published_at: Date
}

