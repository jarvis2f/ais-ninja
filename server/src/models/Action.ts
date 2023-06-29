import {DataTypes, Optional} from 'sequelize';
import {Column, Model, Table} from "sequelize-typescript";

enum ActionTypeEnum {
  LOGIN = 'login',
  RESET_PASSWORD = 'reset_password',
  USE_REDEMPTION_CODE = 'use_redemption_code',
  SIGNIN = 'signin',
  PAY_ORDER = 'pay_order',
  DRAW = 'draw',
  CHAT = 'chat'
}

interface ActionAttributes {
  id?: number;
  user_id: number;
  type?: ActionTypeEnum | null;
  describe?: string | null;
  ip?: string | null;
  create_time: Date;
  update_time: Date;
}

interface ActionCreationAttributes extends Optional<ActionAttributes, 'id' | 'type' | 'describe' | 'ip'> {
}

@Table({
  tableName: 'action',
  underscored: true,
  deletedAt: false,
  createdAt: 'create_time',
  updatedAt: 'update_time',
  hooks: {}
})
export default class Action extends Model<ActionAttributes, ActionCreationAttributes> implements ActionAttributes {
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
  })
  public user_id!: number;
  @Column({
    type: DataTypes.STRING,
    allowNull: true
  })
  public type?: ActionTypeEnum | null;
  @Column({
    type: DataTypes.STRING,
    allowNull: true
  })
  public describe?: string | null;
  @Column({
    type: DataTypes.STRING,
    allowNull: true
  })
  public ip?: string | null;
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

  public static async add(user_id: number, type: ActionTypeEnum, ip: string, describe: string): Promise<Action> {
    // @ts-ignore
    const action: ActionCreationAttributes = {
      user_id: user_id,
      type: type,
      describe: describe,
      ip: ip
    };
    return await Action.create(action);
  }

}

export {Action, ActionTypeEnum};
