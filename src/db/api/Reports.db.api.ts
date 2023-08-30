import {IDbReportsGetUserActivityReportArg, IDbReportsGetUserActivityReportResult} from "./Reports.db.api.types";
import {DbClient} from "../DbClient";

export class ReportsDbApi {
  public static async getUserActivityReport(
    arg: IDbReportsGetUserActivityReportArg
  ): Promise<IDbReportsGetUserActivityReportResult> {

    const query = `
        SELECT nickname,
               email,
               COUNT(DISTINCT comments.id) AS comments_count,
               COUNT(DISTINCT posts.id)    AS posts_count
        FROM users
                 LEFT JOIN comments ON
                    users.id = comments.author_id AND comments.published_at > :from AND comments.published_at < :to
                 LEFT JOIN posts ON
                    users.id = posts.author_id AND posts.published_at > :from AND posts.published_at < :to
        GROUP BY users.nickname, users.email
        ORDER BY ((COUNT(DISTINCT comments.id) + COUNT(DISTINCT posts.id)) / 10 ) DESC
    `;

    const [results] = await DbClient.sequalize.query(query, {
      replacements: {
        from: arg.from_date,
        to: arg.to_date,
      },
      raw: true,
    });

    console.log( results );

    return {
      users: results.map((r: any) => ({
        email: r.email,
        nickname: r.nickname,
        comments_count: r.comments_count,
        posts_count: r.posts_count,
      })),
    };

  }
}