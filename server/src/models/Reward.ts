import {DataTypes} from 'sequelize';
import {Column, Model, Table} from "sequelize-typescript";

interface RewardAttributes {
  id?: number;
  category: string;
  value: string;
  type: string;
  demand: string;
  status: number;
  create_time: Date;
  update_time: Date;
}

@Table({
  tableName: 'reward',
  underscored: true,
  deletedAt: false,
  createdAt: 'create_time',
  updatedAt: 'update_time',
  hooks: {}
})
class Reward extends Model<RewardAttributes> implements RewardAttributes {
  @Column({
    type: DataTypes.BIGINT({unsigned: true}),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  declare public id: number;
  @Column({
    type: DataTypes.STRING,
    allowNull: false
  })
  public category!: string;
  @Column({
    type: DataTypes.STRING,
    allowNull: false
  })
  public value!: string;
  @Column({
    type: DataTypes.STRING,
    allowNull: false
  })
  public type!: string;
  @Column({
    type: DataTypes.STRING,
    allowNull: false
  })
  public demand!: string;
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  })
  public status!: number;
  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  })
  public create_time!: Date;
  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  })
  public update_time!: Date;
}

export {Reward};
