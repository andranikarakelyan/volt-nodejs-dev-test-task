import {Column, Table, Model, AllowNull, ForeignKey, BelongsTo} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {UserModel} from "./User.model";

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

  @ForeignKey(() => UserModel)
  @Column
  author_id!: number;

  @BelongsTo(() => UserModel)
  author!: UserModel;
}
