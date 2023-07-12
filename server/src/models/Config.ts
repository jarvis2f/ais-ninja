import {DataTypes, Optional} from 'sequelize';
import {Column, DataType, Model, Table} from "sequelize-typescript";

enum ConfigNameEnum {
  SHOP_INTRODUCE = 'shop_introduce',
  USER_INTRODUCE = 'user_introduce',
  REGISTER_REWARD = 'register_reward',
  // 受邀人奖励
  INVITEE_REWARD = 'invitee_reward',
  // 邀请者奖励
  INVITER_REWARD = 'inviter_reward',
  DRAW_USE_PRICE = 'draw_use_price',
  HISTORY_MESSAGE_COUNT = 'history_message_count',
  SIGNIN_REWARD = 'signin_reward',

  // deprecated
  AI3_RATIO = 'ai3_ratio',
  AI4_RATIO = 'ai4_ratio',

  MODEL_RATIO = 'model_ratio',
  USER_LEVEL_RATIO = 'user_level_ratio',
}

interface ConfigAttributes {
  id?: number;
  name: ConfigNameEnum;
  value?: string | null;
  remarks?: string | null;
  create_time: Date;
  update_time: Date;
}

interface ConfigCreationAttributes extends Optional<ConfigAttributes, 'id' | 'remarks' | 'create_time' | 'update_time'> {
}

@Table({
  tableName: 'config',
  underscored: true,
  deletedAt: false,
  createdAt: 'create_time',
  updatedAt: 'update_time',
})
class Config extends Model<ConfigAttributes, ConfigCreationAttributes> implements ConfigAttributes {
  @Column({
    type: DataTypes.BIGINT({unsigned: true}),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  declare public id: number;

  @Column({
    type: DataType.ENUM(...Object.values(ConfigNameEnum)),
    allowNull: false,
    unique: true,
  })
  public name!: ConfigNameEnum;

  @Column({
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  })
  public value?: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  })
  public remarks?: string;

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

  public static async getConfig(name: ConfigNameEnum): Promise<string> {
    return Config.findOne({
      where: {
        name
      },
      raw: true
    }).then((config) => {
      return config?.value || '';
    });
  }

  public static async add(name: string, value: any): Promise<Config> {
    return Config.create({
      name: name as ConfigNameEnum,
      value
    });
  }
}

export {Config, ConfigNameEnum};
