import {DataTypes, Optional} from 'sequelize';
import {Column, Model, Table} from "sequelize-typescript";
import utils from "../utils";

interface OrderAttributes {
  id?: number;
  trade_no?: string | null;
  pay_type?: string | null;
  product_id?: number | null;
  trade_status?: string | null;
  user_id?: number | null;
  product_info?: string | null;
  channel?: string | null;
  payment_id?: number | null;
  payment_info?: string | null;
  create_time?: Date | null;
  update_time?: Date | null;
  money?: number | null;
  params?: string | null;
  ip?: string | null;
  notify_info?: string | null;
  pay_url?: string | null;
  product_title?: string | null;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id' | 'create_time' | 'update_time'> {
}

@Table({
  tableName: 'order',
  underscored: true,
  deletedAt: false,
  createdAt: 'create_time',
  updatedAt: 'update_time',
  initialAutoIncrement: '10000'
})
class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
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
    comment: '支付方订单ID'
  })
  public trade_no?: string | null;
  @Column({
    type: DataTypes.STRING,
    allowNull: true,
    comment: '支付方式 wxpay alipay'
  })
  public pay_type?: string | null;
  @Column({
    type: DataTypes.BIGINT({unsigned: true}),
    allowNull: true,
    comment: '商品产品id'
  })
  public product_id?: number | null;
  @Column({
    type: DataTypes.STRING,
    allowNull: true,
    comment: '支付状态'
  })
  public trade_status?: string | null;
  @Column({
    type: DataTypes.BIGINT({unsigned: true}),
    allowNull: false,
    defaultValue: 0,
  })
  public user_id?: number | null;
  @Column({
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '商品信息快照'
  })
  public product_info?: string | null;
  @Column({
    type: DataTypes.STRING,
    allowNull: true,
    comment: '渠道号'
  })
  public channel?: string | null;
  @Column({
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '支付产品ID'
  })
  public payment_id?: number | null;
  @Column({
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '支付产品信息'
  })
  public payment_info?: string | null;
  @Column({
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  })
  public create_time?: Date | null;
  @Column({
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  })
  public update_time?: Date | null;
  @Column({
    type: DataTypes.DOUBLE,
    allowNull: true,
    comment: '支付金额'
  })
  public money?: number | null;
  @Column({
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '拓展参数'
  })
  public params?: string | null;
  @Column({
    type: DataTypes.STRING,
    allowNull: true
  })
  public ip?: string | null;
  @Column({
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '回调信息'
  })
  public notify_info?: string | null;
  @Column({
    type: DataTypes.STRING,
    allowNull: true,
    comment: '支付链接'
  })
  public pay_url?: string | null;
  @Column({
    type: DataTypes.STRING,
    allowNull: true,
    comment: '商品标题'
  })
  public product_title?: string | null;

  static async add(param: {
    id: number;
    ip: string;
    channel: string;
    product_info: string;
    params: string;
    product_title: string;
    pay_url: string;
    money: number;
    user_id: number;
    payment_id: number;
    product_id: any;
    trade_status: string;
    pay_type: any;
    payment_info: string
  }) {
    return Order.create({
      ...param
    });
  }
}

export {Order};
