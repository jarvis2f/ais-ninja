import {DataTypes} from 'sequelize';
import {Column, Model, Table} from "sequelize-typescript";

interface PaymentAttributes {
  id?: number;
  name: string;
  channel: string;
  types: string | null;
  params: string;
  status: number;
  create_time: Date;
  update_time: Date;
}

@Table({
  tableName: 'payment',
  underscored: true,
  deletedAt: false,
  createdAt: 'create_time',
  updatedAt: 'update_time',
  initialAutoIncrement: '10000'
})
class Payment extends Model<PaymentAttributes> implements PaymentAttributes {
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
    comment: '名称',
  })
  public name!: string;
  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
    comment: '标识 支付宝 微信 易支付 码支付',
  })
  public channel!: string;
  @Column({
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: "['ailipay','wxpay']",
  })
  public types!: string | null;
  @Column({
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '支付所需参数',
  })
  public params!: string;
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '1 正常 0异常',
  })
  public status!: number;
  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  })
  public create_time!: Date;
  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    onUpdate: 'NOW()',
  })
  public update_time!: Date;

  public static async add(channel: any, name: any, params: any, types: any, status: number): Promise<Payment> {
    return Payment.create({
      channel,
      name,
      params,
      types,
      status
    } as PaymentAttributes);
  }

  public static async edit(id: any, channel: any, name: any, params: any, types: any, status: any): Promise<[Payment, (boolean | null)]> {
    return Payment.upsert({
      id,
      channel,
      name,
      params,
      types,
      status
    } as PaymentAttributes);
  }
}

export {Payment};
