import {Column, Table, Model, AllowNull} from "sequelize-typescript";
import {DataTypes} from "sequelize";

@Table({
  tableName: 'changes',
})
export class ChangeModel extends Model {
  @AllowNull(false)
  @Column({type: DataTypes.TEXT})
  table_name!: string;

  @AllowNull(false)
  @Column({type: DataTypes.INTEGER})
  table_id!: number;

  @AllowNull(false)
  @Column({type: DataTypes.DATE})
  changed_at!: Date;

  @AllowNull(false)
  @Column({type: DataTypes.JSONB})
  data!: any;

  @AllowNull(false)
  @Column({type: DataTypes.ENUM('insert', 'delete')})
  action!: 'insert' | 'delete';
}