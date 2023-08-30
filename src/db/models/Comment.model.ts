import {
  Column,
  Table,
  Model,
  AllowNull,
  ForeignKey,
  BelongsTo,
  AfterCreate,
  BeforeDestroy
} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {PostModel} from "./Post.model";
import {UserModel} from "./User.model";
import {ChangesDbApi} from "../api/Changes.db.api";

@Table({
  tableName: 'comments'
})
export class CommentModel extends Model {
  @AllowNull(false)
  @Column({type: DataTypes.STRING})
  body!: string;

  @AllowNull(false)
  @Column({type: DataTypes.DATE})
  published_at!: Date;

  @AllowNull(false)
  @ForeignKey(() => PostModel)
  @Column
  post_id!: number;

  @BelongsTo(() => PostModel)
  post!: PostModel;

  @AllowNull(false)
  @ForeignKey(() => UserModel)
  @Column
  author_id!: number;

  @BelongsTo(() => UserModel)
  author!: UserModel;

  @AfterCreate
  static async afterCreateHook(record: CommentModel) {
    await ChangesDbApi.create({
      table_name: CommentModel.tableName,
      table_id: record.id,
      data: record.toJSON(),
      action: 'insert',
    });
  }

  @BeforeDestroy
  static async beforeDestroyHook(record: CommentModel) {
    await ChangesDbApi.create({
      table_name: CommentModel.tableName,
      table_id: record.id,
      data: record.toJSON(),
      action: 'delete',
    });
  }

}
