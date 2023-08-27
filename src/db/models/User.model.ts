import {Column, Table, Model, AllowNull} from "sequelize-typescript";
import {DataTypes} from "sequelize";

@Table({
  tableName: 'users',
})
export class UserModel extends Model {
  @AllowNull(false)
  @Column({type: DataTypes.STRING})
  nickname!: string;

  @AllowNull(false)
  @Column({type: DataTypes.STRING})
  email!: string;

  @AllowNull(false)
  @Column({type: DataTypes.STRING})
  password!: string;
}