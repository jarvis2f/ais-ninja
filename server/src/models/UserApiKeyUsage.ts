import {Column, Model, Table} from "sequelize-typescript";
import {DataTypes, Optional} from "sequelize";

interface UserApiKeyUsageAttributes {
  id: number;
  user_id: number;
  api_key_id: number;
  model: string;
  request?: string;
  response?: string;
  prompt_tokens: number;
  completion_tokens: number;
  prompt_integral: number;
  completion_integral: number;
  create_time: Date;
  update_time: Date;
}

interface UserApiKeyUsageCreationAttributes extends Optional<UserApiKeyUsageAttributes, 'id' | 'request' | 'response' | 'create_time' | 'update_time'> {

}

@Table({
  tableName: 'user_api_key_usage',
  underscored: true,
  deletedAt: false,
  createdAt: 'create_time',
  updatedAt: 'update_time',
})
export class UserApiKeyUsage extends Model<UserApiKeyUsageAttributes, UserApiKeyUsageCreationAttributes> implements UserApiKeyUsageAttributes {
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
    type: DataTypes.BIGINT({unsigned: true}),
    allowNull: false,
    defaultValue: 0,
  })
  public api_key_id!: number;

  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  })
  public model!: string;

  @Column({
    type: DataTypes.TEXT,
    allowNull: true,
  })
  public request?: string;

  @Column({
    type: DataTypes.TEXT,
    allowNull: true,
  })
  public response?: string;

  @Column({
    type: DataTypes.INTEGER({unsigned: true}),
    allowNull: false,
    defaultValue: 0,
  })
  public prompt_tokens!: number;

  @Column({
    type: DataTypes.INTEGER({unsigned: true}),
    allowNull: false,
    defaultValue: 0,
  })
  public completion_tokens!: number;

  @Column({
    type: DataTypes.INTEGER({unsigned: true}),
    allowNull: false,
    defaultValue: 0,
  })
  public prompt_integral!: number;

  @Column({
    type: DataTypes.INTEGER({unsigned: true}),
    allowNull: false,
    defaultValue: 0,
  })
  public completion_integral!: number;

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
