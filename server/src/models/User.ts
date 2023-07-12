import {DataTypes, Optional} from 'sequelize';
import crypto, {randomUUID} from 'crypto';
import {Config, ConfigNameEnum} from "./Config";
import {Turnover} from "./Turnover";
import dayjs from "dayjs";
import {Product, ProductTypeEnum} from "./Product";
import {Column, Model, Table} from "sequelize-typescript";
import {Plugin} from "./Plugin";
import utils from "../utils";

export enum UserRoleEnum {
  USER = 'user',
  ADMIN = 'administrator',
}

// 用户等级
export enum UserLevelEnum {
  NORMAL, // 普通用户
  VIP, // 会员
  PRO, // 专业版
  BUSINESS, // 商业版
}

interface UserAttributes {
  id?: number;
  nickname: string;
  account: string;
  password: string;
  avatar: string;
  role: string;
  integral: number;
  invite_code: string;
  invite_by?: number;
  level: number;
  level_expire_time: Date;
  //@deprecated
  vip_expire_time: Date;
  //@deprecated
  svip_expire_time: Date;
  status: number;
  ip: string;
  create_time: Date;
  update_time: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'integral' | 'level' | 'level_expire_time' | 'status' | 'ip' | 'create_time' | 'update_time'> {
}

@Table({
  tableName: 'user',
  underscored: true,
  deletedAt: false,
  createdAt: 'create_time',
  updatedAt: 'update_time',
  initialAutoIncrement: '10000'
})
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {

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
    defaultValue: '',
  })
  public nickname!: string;

  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  })
  public account!: string;

  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
    get() {
      return '';
    }
  })
  public password!: string;

  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  })
  public avatar!: string;

  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: 'user',
  })
  public role: string = 'user';

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  public integral: number = 0;
  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  })
  public invite_code!: string;
  @Column({
    type: DataTypes.BIGINT({unsigned: true}),
    allowNull: false,
    defaultValue: 0,
  })
  public invite_by?: number;
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  public level!: number;
  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: dayjs().startOf('day').toDate(),
  })
  public level_expire_time!: Date;
  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: dayjs().startOf('day').toDate(),
  })
  public vip_expire_time!: Date;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: dayjs().startOf('day').toDate(),
  })
  public svip_expire_time!: Date;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  public status: number = 0;

  @Column({
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  })
  public ip: string = '';

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
  })
  public create_time!: Date;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
  })
  public update_time!: Date;


  public installed_plugins?: Plugin[] | [];

  static TOKEN_SECRET = 'mVePJaeB3L7PKmKN';


  public static async getUserByAccount(account: string): Promise<User | null> {
    return User.findOne({
      where: {
        account
      }
    });
  }

  public static async getUserByInviteCode(invite_code: string): Promise<User | null> {
    return User.findOne({
      where: {
        invite_code
      }
    });
  }

  public static async add(account: string, password: string, ip: string,
                          name: string | undefined = void 0,
                          picture: string | undefined = void 0,
                          invite_by: number = 0): Promise<User | null> {
    let register_reward = Number(await Config.getConfig(ConfigNameEnum.REGISTER_REWARD) || 0);
    // 受邀人奖励
    let invitee_reward = Number(await Config.getConfig(ConfigNameEnum.INVITEE_REWARD) || 0);
    // 邀请人奖励
    let inviter_reward = Number(await Config.getConfig(ConfigNameEnum.INVITER_REWARD || 0));
    if (invite_by > 0) {
      let invite_user = await User.findByPk(invite_by);
      if (invite_user) {
        register_reward += invitee_reward;
        if (inviter_reward > 0) {
          await User.updateUserIntegralOrLevelTime({
            user_id: invite_by,
            quantity: inviter_reward,
            type: 1,
            describe: '{邀请奖励}'
          })
        }
      } else {
        throw new Error('Invalid invite code');
      }
    }
    // @ts-ignore
    let user: UserCreationAttributes = {
      nickname: name || 'User' + randomUUID().substr(0, 5),
      account: account,
      invite_code: await User.generateInviteCode(),
      invite_by: invite_by,
      avatar: picture || 'https://s1.imgcap.xyz/bcc944df79b3a1f86cd5d6d5eb58485d.png',
      integral: register_reward,
      password: User.encryPassword(password ? password : utils.random_string(8) + '1'),
      role: 'user',
      ip: ip,
      vip_expire_time: dayjs().startOf('day').toDate(),
      svip_expire_time: dayjs().startOf('day').toDate(),
      status: 1
    }
    user = (await User.create(user)).toJSON();
    await Turnover.add(user.id!, '{注册奖励}', `${register_reward}{积分}`);
    return User.findByPk(user.id!);
  }

  public static async initAdministrator(): Promise<{ account: string, password: string } | boolean> {
    if (await User.findOne({where: {role: 'administrator'}})) {
      return false;
    }

    const password = utils.random_string(8) + '1';
    let user: UserCreationAttributes = {
      nickname: 'Admin',
      account: 'admin_' + utils.random_string(4),
      invite_code: await User.generateInviteCode(),
      avatar: 'https://s1.imgcap.xyz/bcc944df79b3a1f86cd5d6d5eb58485d.png',
      integral: 0,
      password: User.encryPassword(password),
      role: 'administrator',
      vip_expire_time: dayjs().startOf('day').toDate(),
      svip_expire_time: dayjs().startOf('day').toDate(),
      status: 1
    }
    user = (await User.create(user)).toJSON();
    return {account: user.account, password: password};
  }

  private static async generateInviteCode(): Promise<string> {
    // 生成邀请码
    let invite_code;
    do {
      invite_code = utils.random_string(4).toUpperCase();
    } while (await User.findOne({where: {invite_code}}));
    return invite_code;
  }

  public static async updatePassword(user_id: number, password: any) {
    return User.update({
      password: User.encryPassword(password)
    }, {
      where: {
        id: user_id
      }
    });
  }

  public static encryPassword(password: string): string {
    return crypto.createHash('md5').update(password).digest('hex');
  }

  public async checkPassword(password: string) {
    return await User.findOne({
      where: {
        id: this.id,
        password: User.encryPassword(password)
      }
    }) !== null;
  }

  generateToken(): string {
    const encrypted = this.id + randomUUID() + User.TOKEN_SECRET;
    return crypto.createHash('md5').update(encrypted).digest('hex');
  }

  // 增减用户积分
  public static async updateUserIntegralOrLevelTime(params: {
    user_id: number,
    quantity: number,
    // 1: 积分 2：等级天数
    type: number,
    describe?: string,
    level?: number | undefined,
  }) {
    let {user_id, quantity, type, describe, level} = params;
    const user = await User.findByPk(user_id);
    let turnover = '';
    if (!user)
      throw new Error('User not found');
    if (type === 1) {
      if (quantity > 0) {
        user.increment('integral', {
          by: quantity
        });
      } else {
        user.decrement('integral', {
          by: Math.abs(quantity)
        });
      }
      turnover = `${quantity}{积分}`;
    } else {
      // 给level_expire_time: Date 添加或者减少天数
      let level_expire_time = user.get('level_expire_time');
      if (level_expire_time === null)
        level_expire_time = dayjs().startOf('day').toDate();
      if (quantity > 0) {
        level_expire_time = dayjs(level_expire_time).add(quantity, 'day').toDate();
      } else {
        level_expire_time = dayjs(level_expire_time).subtract(Math.abs(quantity), 'day').toDate();
      }
      await user.update({
        level_expire_time
      });
      turnover = `${quantity}{天}`;
    }
    if (level && level >= 0) {
      await user.update({
        level
      });
    }
    await Turnover.add(user_id, describe || '{系统}', turnover);
  }

  public static async addUserProductQuota(user_id: number, product: Product): Promise<boolean> {
    if (product && user_id) {
      let subscribeDay = 0;
      let integral = 0;
      let type: number;
      if (product.type === ProductTypeEnum.INTEGRAL) {
        integral = product.value!;
        type = 1;
      } else {
        subscribeDay = product.value!;
        type = 2;
      }
      await User.updateUserIntegralOrLevelTime({
        user_id: user_id,
        quantity: type === 1 ? integral : subscribeDay,
        type: type,
        level: product.level,
        describe: `{购买}-${product.title}`
      });
      return true;
    }
    return false;
  }
}

export {
  User
};
