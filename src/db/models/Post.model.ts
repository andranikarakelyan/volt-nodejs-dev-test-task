import {Column, Table, Model, AllowNull, ForeignKey, BelongsTo, HasMany} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {UserModel} from "./User.model";
import {CommentModel} from "./Comment.model";

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
}
