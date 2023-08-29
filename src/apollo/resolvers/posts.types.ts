// publishPost
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

// common
export interface IPost {
  id: number
  title: string
  body: string
  published_at: Date
  author_nickname: string
  comments: IComment[]
}