import {DataTypes, Optional} from "sequelize";
import {Column, Model, Table} from "sequelize-typescript";

interface FunctionsAttributes {
  id?: number;
  plugin_id: number;
  name: string;
  description: string;
  parameters: string;
  script: string;
  create_time: Date;
  update_time: Date;
}

interface FunctionsCreationAttributes extends Optional<FunctionsAttributes, 'id'> {
}

@Table({
  tableName: 'functions',
  underscored: true,
  deletedAt: false,
  createdAt: 'create_time',
  updatedAt: 'update_time',
})
class Functions extends Model<FunctionsAttributes, FunctionsCreationAttributes> implements FunctionsAttributes {

  @Column({
    type: DataTypes.BIGINT({unsigned: true}),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  declare public id?: number;

  @Column({
    type: DataTypes.STRING(64),
    allowNull: false,
  })
  public name!: string;
  @Column({
    type: DataTypes.BIGINT({unsigned: true}),
    allowNull: false,
  })
  public plugin_id!: number;
  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
  })
  public description!: string;
  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
  })
  public parameters!: string;
  @Column({
    type: DataTypes.TEXT,
    allowNull: false,
  })
  public script!: string;
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
}

export {Functions};
