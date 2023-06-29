import {DataTypes} from 'sequelize';
import {WhereOptions} from "sequelize/types/model";
import {Column, Model, Table} from "sequelize-typescript";
import utils from "../utils";

interface TurnoverAttributes {
  id?: number;
  user_id: number;
  describe: string;
  value: string;
  create_time: Date;
  update_time: Date;
}

@Table({
  tableName: 'turnover',
  underscored: true,
  deletedAt: false,
  createdAt: 'create_time',
  updatedAt: 'update_time',
})
class Turnover extends Model<TurnoverAttributes> implements TurnoverAttributes {
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
    defaultValue: 0
  })
  public user_id!: number;

  @Column({
    type: DataTypes.STRING,
    allowNull: false
  })
  public describe!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false
  })
  public value!: string;

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

  public static async add(user_id: number, describe: string, value: string): Promise<Turnover> {
    // @ts-ignore
    const turnover: TurnoverAttributes = {
      user_id: user_id,
      describe: describe,
      value: value
    };
    return await Turnover.create(turnover);
  }

  static async getUserTurnovers(page: number, page_size: number, where: WhereOptions): Promise<{
    rows: Turnover[],
    count: number
  }> {
    return await Turnover.findAndCountAll({
      where: where,
      order: [['create_time', 'DESC']],
      offset: page * page_size,
      limit: page_size,
      raw: true,
    });
  }
}

export {Turnover};
