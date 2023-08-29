import {Column, Table, Model, AllowNull, ForeignKey, BelongsTo} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {PostModel} from "./Post.model";
import {UserModel} from "./User.model";

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
}
