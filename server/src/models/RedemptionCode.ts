// @ts-ignore
import {DataTypes, Op, Optional, Sequelize, SequelizeStatic} from 'sequelize';
import {Column, DataType, Model, Table} from "sequelize-typescript";
import utils from "../utils";
import dayjs from "dayjs";

enum RedemptionCodeTypeEnum {
  INTEGRAL = 'integral',
  DAY = 'day',
}

interface RedemptionCodeAttributes {
  id?: number;
  ip?: string | null;
  user_id?: number | null;
  key: string;
  value: string;
  status: number;
  type: RedemptionCodeTypeEnum;
  end_time?: Date | null;
  create_time: Date;
  update_time: Date;
  level?: number | null;
}

interface RedemptionCodeCreationAttributes extends Optional<RedemptionCodeAttributes, 'id' | 'ip' | 'user_id' | 'end_time' | 'level' | 'create_time' | 'update_time'> {
}

@Table({
  tableName: 'redemption_code',
  underscored: true,
  deletedAt: false,
  createdAt: 'create_time',
  updatedAt: 'update_time',
  initialAutoIncrement: '10000'
})
class RedemptionCode extends Model<RedemptionCodeAttributes, RedemptionCodeCreationAttributes> implements RedemptionCodeAttributes {
  @Column({
    type: DataTypes.BIGINT({unsigned: true}),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  declare public id: number;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
    comment: '使用时候的ip'
  })
  public ip?: string | null;
  @Column({
    type: DataTypes.BIGINT({unsigned: true}),
    allowNull: true,
    comment: '使用者'
  })
  public user_id?: number | null;
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    comment: '卡密'
  })
  public key!: string;
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    comment: '积分'
  })
  public value!: string;
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '0有效 1使用 2过期'
  })
  public status!: number;
  @Column({
    type: DataType.ENUM(...Object.values(RedemptionCodeTypeEnum)),
    allowNull: false,
    comment: '类型'
  })
  public type!: RedemptionCodeTypeEnum;
  @Column({
    type: DataTypes.DATE,
    allowNull: true,
    comment: '截止时间'
  })
  public end_time?: Date | null;
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  public level?: number | null;
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

  static async addBatches(redemption_codes: {
    level: number;
    end_time: string;
    type: string;
    value: number;
    key: any;
    status: number
  }[]) {
    const redemption_code_datas: RedemptionCodeCreationAttributes[] = [];

    for (const redemption_code of redemption_codes) {
      const {level, end_time, type, value, key, status} = redemption_code;

      const redemptionCodeData: RedemptionCodeCreationAttributes = {
        key: key,
        value: value.toString(),
        status: status,
        type: type as RedemptionCodeTypeEnum,
      };

      if (end_time) {
        redemptionCodeData.end_time = dayjs(end_time).startOf('day').toDate();
      }

      if (level) {
        redemptionCodeData.level = level;
      }

      redemption_code_datas.push(redemptionCodeData);
    }
    return RedemptionCode.bulkCreate(redemption_code_datas);
  }

  static async updateExpired() {
    return await RedemptionCode.update({
      status: 2
    }, {
      where: {
        end_time: {
          [Op.lt]: new Date(),
        },
        status: 0
      }
    });
  }
}

export {RedemptionCode, RedemptionCodeTypeEnum};
