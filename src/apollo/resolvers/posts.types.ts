export interface IPublishPostArg {
  title: string
  body: string
  published_at: Date | undefined | null
}

export interface IPublishPostResult {
  post: IPost
}

export interface IDeletePostArg {
  id: number;
}

export interface IDeletePostResult {
}

export interface IPost {
  id: number
  title: string
  body: string
  published_at: Date
  author_nickname: string
  comments: IComment[]
}