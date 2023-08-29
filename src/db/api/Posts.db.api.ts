import {
  IDbPost,
  IDbPostCreateArg,
  IDbPostCreateResult,
  IDbPostDeleteByIdArg,
  IDbPostDeleteByIdResult,
  IDbPostGetByIdArg,
  IDbPostGetByIdResult,
  IDbPostGetManyArg,
  IDbPostGetManyResult
} from "./Posts.db.api.types";
import {AppError} from "../../utils/AppError";
import {ErrorCode} from "../../utils/ErrorCode";
import {PostModel} from "../models/Post.model";
import {UserModel} from "../models/User.model";
import {DbClient} from "../DbClient";
import {ESortOrder} from "../../apollo/resolvers/posts.types";

export class PostsDbApi {
  public static async create(arg: IDbPostCreateArg): Promise<IDbPostCreateResult> {

    const user = await UserModel.findByPk(arg.author_id, {raw: true});

    if (!user) {
      throw new AppError(ErrorCode.NOT_FOUND, 'User not found');
    }

    let post = await PostModel.create({
      title: arg.title,
      body: arg.body,
      published_at: arg.published_at,
      author_id: arg.author_id,
    });
    post = post.toJSON();

    return {
      post: {
        id: post.id,
        title: post.title,
        body: post.body,
        published_at: post.published_at,
        author_nickname: user.nickname,
        comments: [],
      },
    };
  }

  public static async deleteById(arg: IDbPostDeleteByIdArg): Promise<IDbPostDeleteByIdResult> {

    await PostModel.destroy({
      where: {
        id: arg.id,
      },
    });

    return {};

  }

  public static async getById(arg: IDbPostGetByIdArg): Promise<IDbPostGetByIdResult> {

    const {posts: [post]} = await this.getMany({
      ids: [arg.id],
      page: 1,
      per_page: 1,
      sort_order: ESortOrder.ASC,
    });

    if (!post) {
      throw new AppError(ErrorCode.NOT_FOUND, 'Post not found');
    }

    return {post};
  };

  public static async getMany(arg: IDbPostGetManyArg): Promise<IDbPostGetManyResult> {

    let qp = [];
    qp.push(`
        SELECT posts.id           AS id,
               posts.title        AS title,
               posts.body         AS body,
               posts.published_at AS published_at,
               users.nickname     AS author_nickname,
               COALESCE(
                       JSON_AGG(
                               JSON_BUILD_OBJECT(
                                       'id', c.id,
                                       'body', c.body,
                                       'published_at', c.published_at,
                                       'author_nickname', c.author_nickname
                                   )
                           ) FILTER(WHERE C.id IS NOT NULL), '[]' ::JSON
                   )              AS comments,
               COUNT(*)              OVER () AS all_count
        FROM posts
                 LEFT JOIN LATERAL (
            SELECT post_comments.id,
                   post_comments.body,
                   post_comments.published_at,
                   post_comments.post_id,
                   comment_authors.nickname AS author_nickname
            FROM comments AS post_comments
                     LEFT JOIN users AS comment_authors ON comment_authors.id = post_comments.author_id
            WHERE post_comments.post_id = posts.id
            ORDER BY post_comments.published_at DESC
                LIMIT 10
        ) AS C
        ON posts.id = C.post_id
            LEFT JOIN users ON posts.author_id = users.id
    `);

    // WHERE
    const wc = [];
    if (arg.published_after) {
      wc.push(`AND posts.published_at >= :published_after`);
    }

    if (arg.ids?.length) {
      wc.push('AND posts.id IN(:ids)');
    }

    if (wc.length) {
      qp.push(`WHERE true ${wc.join(' ')}`);
    }

    // GROUP BY
    qp.push(`GROUP BY posts.id, users.nickname`);
    if (typeof arg.has_comments === "boolean") {
      qp.push(`HAVING COUNT(c.id) ${arg.has_comments ? '>' : '='} 0`);
    }

    // ORDER/LIMIT
    qp.push(`ORDER BY published_at ${arg.sort_order}`);
    qp.push(`OFFSET :offset LIMIT :limit`);

    const [posts] = (await DbClient.sequalize.query(qp.join('\n'), {
      raw: true,
      replacements: {
        offset: (arg.page - 1) * arg.per_page,
        limit: arg.per_page,
        published_after: arg.published_after,
        ids: arg.ids,
      },
    })) as [(IDbPost & { all_count: number })[], unknown];

    const all_count = posts[0]?.all_count || 0;

    const all_pages_count = Math.ceil(all_count / arg.per_page);

    return {
      posts: posts as any,
      all_pages_count,
      all_records_count: all_count,
      is_last_page: all_pages_count === arg.page,
    };
  }

}