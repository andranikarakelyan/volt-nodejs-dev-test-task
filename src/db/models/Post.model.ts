import {
  Column,
  Table,
  Model,
  AllowNull,
  ForeignKey,
  BelongsTo,
  HasMany,
  AfterCreate,
  BeforeDestroy,
} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {UserModel} from "./User.model";
import {CommentModel} from "./Comment.model";
import {ChangesDbApi} from "../api/Changes.db.api";

@Table({
  tableName: 'posts',
})
export class PostModel extends Model {
  @AllowNull(false)
  @Column({type: DataTypes.STRING})
  title!: string;

  @AllowNull(false)
  @Column({type: DataTypes.STRING})
  body!: string;

  @AllowNull(false)
  @Column({type: DataTypes.DATE})
  published_at!: Date;

  @AllowNull(false)
  @ForeignKey(() => UserModel)
  @Column
  author_id!: number;

  @BelongsTo(() => UserModel)
  author!: UserModel;

  @HasMany(() => CommentModel)
  comments!: CommentModel[];

  @AfterCreate
  static async afterCreateHook( record: PostModel ) {
    await ChangesDbApi.create({
      table_name: PostModel.tableName,
      table_id: record.id,
      data: record.toJSON(),
      action: 'insert',
    });
  }

  @BeforeDestroy
  static async beforeDestroyHook( record: PostModel ) {
    await ChangesDbApi.create({
      table_name: PostModel.tableName,
      table_id: record.id,
      data: record.toJSON(),
      action: 'delete',
    });
  }
}
