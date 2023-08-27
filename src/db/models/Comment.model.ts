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

  @Column({type: DataTypes.DATE})
  published_at!: Date | null;

  @ForeignKey(() => PostModel)
  @Column
  post_id!: number;

  @BelongsTo(() => PostModel)
  post!: PostModel;

  @ForeignKey(() => UserModel)
  @Column
  author_id!: number;

  @BelongsTo(() => UserModel)
  author!: UserModel;
}
