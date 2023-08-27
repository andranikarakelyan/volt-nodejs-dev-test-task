export interface IDbPostCreateArg {
  title: string;
  body: string;
  published_at: Date;
  author_id: number;
}

export interface IDbPostCreateResult {
  id: number;
  title: string;
  body: string;
  published_at: Date | null;
  author_nickname: string;
}