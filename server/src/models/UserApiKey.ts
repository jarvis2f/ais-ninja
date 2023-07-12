import {Column, Model, Table} from "sequelize-typescript";
import {DataTypes, Optional} from "sequelize";

interface UserApiKeyAttributes {
  id: number;
  user_id: number;
  name: string;
  api_key: string;
  create_time: Date;
  update_time: Date;
}

interface UserApiKeyCreationAttributes extends Optional<UserApiKeyAttributes, 'id' | 'create_time' | 'update_time'> {
}

@Table({
  tableName: 'user_api_key',
  underscored: true,
  deletedAt: false,
  createdAt: 'create_time',
  updatedAt: 'update_time',
  initialAutoIncrement: '10000'
})
export class UserApiKey extends Model<UserApiKeyAttributes, UserApiKeyCreationAttributes> implements UserApiKeyAttributes {

  @Column({
    type: DataTypes.BIGINT({unsigned: true}),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  declare public id: number;

  @Column({
    type: DataTypes.BIGINT({unsigned: true}),
    allowNull: false,
    defaultValue: 0,
  })
  public user_id!: number;

  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  })
  public name!: string;

  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  })
  public api_key!: string;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
  })
  public create_time!: Date;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
  })
  public update_time!: Date;

}
