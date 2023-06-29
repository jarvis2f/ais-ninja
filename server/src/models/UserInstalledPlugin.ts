import {DataTypes, Optional} from "sequelize";
import {Column, Model, Table} from "sequelize-typescript";
import {User} from "./User";
import {Plugin} from "./Plugin";

interface UserInstalledPluginAttributes {
  id?: number;
  user_id: number;
  plugin_id: number;
}

interface UserInstalledPluginCreationAttributes extends Optional<UserInstalledPluginAttributes, "id"> {
}

@Table({
  tableName: 'user_installed_plugin',
  underscored: true,
  deletedAt: false,
  createdAt: 'create_time',
  updatedAt: 'update_time',
})
class UserInstalledPlugin extends Model<UserInstalledPluginAttributes, UserInstalledPluginCreationAttributes> implements UserInstalledPluginAttributes {

  @Column({
    type: DataTypes.BIGINT({unsigned: true}),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  declare public id?: number;

  @Column({
    type: DataTypes.BIGINT({unsigned: true}),
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  })
  public user_id!: number;

  @Column({
    type: DataTypes.BIGINT({unsigned: true}),
    allowNull: false,
    references: {
      model: Plugin,
      key: 'id'
    }
  })
  public plugin_id!: number;

}

export {
  UserInstalledPlugin
};
