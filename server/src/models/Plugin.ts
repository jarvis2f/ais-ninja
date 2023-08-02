import {DataTypes, Optional} from "sequelize";
import {Column, Model, Table} from "sequelize-typescript";
import {Functions} from "./Functions";
import {User} from "./User";

interface PluginAttributes {
  id?: number;
  name: string;
  description?: string;
  avatar?: string;
  creator_id?: number;
  status: number;
  variables: string;
  create_time: Date;
  update_time: Date;
}

interface PluginCreationAttributes extends Optional<PluginAttributes, 'id' | 'description' | 'avatar' | 'variables'> {
}

@Table({
  tableName: 'plugin',
  underscored: true,
  deletedAt: false,
  createdAt: 'create_time',
  updatedAt: 'update_time',
  initialAutoIncrement: '10000'
})
class Plugin extends Model<PluginAttributes, PluginCreationAttributes> implements PluginAttributes {

  @Column({
    type: DataTypes.BIGINT({unsigned: true}),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  declare public id: number;

  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
  })
  public name!: string;
  @Column({
    type: DataTypes.TEXT,
    allowNull: false,
  })
  public description?: string;
  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: ''
  })
  public avatar?: string;
  @Column({
    type: DataTypes.BIGINT({unsigned: true}),
    allowNull: false,
    defaultValue: 0
  })
  public creator_id?: number;
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  })
  public status!: number;
  @Column({
    type: DataTypes.TEXT,
    allowNull: true,
  })
  public variables!: string;
  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  })
  public readonly create_time!: Date;
  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  })
  public readonly update_time!: Date;

  functions?: Functions[];
  installed_users?: User[];

}

export {Plugin};
