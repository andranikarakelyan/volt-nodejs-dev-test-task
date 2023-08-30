export interface IDbReportsGetUserActivityReportArg {
  from_date: Date;
  to_date: Date;
}

export interface IDbReportsGetUserActivityReportResult {
  users: {
    nickname: number;
    email: number;
    posts_count: number;
    comments_count: number;
  }[]
}