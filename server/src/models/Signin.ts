// @ts-ignore
import {DataTypes, Op, Sequelize, SequelizeStatic} from 'sequelize';
import {Column, Model, Table} from "sequelize-typescript";
import utils from "../utils";

interface SigninAttributes {
  id?: number;
  user_id: number;
  ip: string;
  status?: number;
  create_time: Date;
  update_time: Date;
}

@Table({
  tableName: 'signin',
  underscored: true,
  deletedAt: false,
  createdAt: 'create_time',
  updatedAt: 'update_time',
})
class Signin extends Model<SigninAttributes> implements SigninAttributes {
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
  public ip!: string;
  @Column({
    type: DataTypes.INTEGER,
    defaultValue: 1
  })
  public status?: number;
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

  public static async isSigninToday(user_id: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    return await Signin.findOne({
      where: {
        user_id: user_id,
        create_time: {
          [Op.gte]: today,
          [Op.lt]: tomorrow,
        }
      }
    }) !== null;
  }

  static async getUserSigninList(user_id: number, start_time: Date, end_time: Date): Promise<Signin[]> {
    return Signin.findAll({
      where: {
        user_id: user_id,
        create_time: {
          [Op.gte]: start_time,
          [Op.lt]: end_time,
        }
      }
    });
  }

  static async add(user_id: number, ip: string) {
    // @ts-ignore
    const signin: SigninAttributes = {
      user_id,
      ip,
      status: 1,
    }
    return Signin.create(signin);
  }
}

export {Signin};
