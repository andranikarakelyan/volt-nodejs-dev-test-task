import {Column, Table, Model, AllowNull} from "sequelize-typescript";
import {DataTypes} from "sequelize";

@Table({
  tableName: 'users',
})
export class UserModel extends Model {
  @AllowNull(false)
  @Column({type: DataTypes.TEXT})
  nickname!: string;

  @AllowNull(false)
  @Column({type: DataTypes.TEXT})
  email!: string;

  @AllowNull(false)
  @Column({type: DataTypes.TEXT})
  password!: string;
}