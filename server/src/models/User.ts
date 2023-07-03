import {DataTypes, Optional} from 'sequelize';
import crypto, {randomUUID} from 'crypto';
import {Config, ConfigNameEnum} from "./Config";
import {Turnover} from "./Turnover";
import dayjs from "dayjs";
import {RedemptionCodeTypeEnum} from "./RedemptionCode";
import {Product, ProductTypeEnum} from "./Product";
import {Column, Model, Table} from "sequelize-typescript";
import {Plugin} from "./Plugin";
import utils from "../utils";

interface UserAttributes {
  id?: number;
  nickname: string;
  account: string;
  password: string;
  avatar: string;
  role: string;
  integral: number;
  vip_expire_time: Date;
  svip_expire_time: Date;
  status: number;
  ip: string;
  create_time: Date;
  update_time: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'integral' | 'status' | 'ip' | 'create_time' | 'update_time'> {
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
    defaultValue: DataTypes.NOW
  })
  public create_time!: Date;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    onUpdate: 'NOW()',

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

  public static async add(account: string, password: string, ip: string,
                          name: string | undefined = void 0,
                          picture: string | undefined = void 0): Promise<User | null> {
    let register_reward = Number(await Config.getConfig(ConfigNameEnum.REGISTER_REWARD));
    // @ts-ignore
    let user: UserCreationAttributes = {
      nickname: name || 'User' + randomUUID().substr(0, 5),
      account: account,
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

  public static async initAdministrator(): Promise<{account: string, password: string} | boolean> {
    if (await User.findOne({where: {role: 'administrator'}})) {
      return false;
    }
    const password = utils.random_string(8) + '1';
    let user: UserCreationAttributes = {
      nickname: 'Admin',
      account: 'admin_' + utils.random_string(4),
      avatar: 'https://s1.imgcap.xyz/bcc944df79b3a1f86cd5d6d5eb58485d.png',
      integral: 0,
      password: User.encryPassword(password),
      role: 'administrator',
      vip_expire_time: dayjs().startOf('day').toDate(),
      svip_expire_time: dayjs().startOf('day').toDate(),
      status: 1
    }
    user = (await User.create(user)).toJSON();
    return { account: user.account, password: password };
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

  async checkPassword(password: string) {
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

  static async updateUserVIP(params: {
    operate: string;
    user_id: number;
    level?: number | null | undefined;
    type: RedemptionCodeTypeEnum;
    value: number
  }) {
    const user = await User.findByPk(params.user_id);
    if (params.type === RedemptionCodeTypeEnum.INTEGRAL) {
      if (params.operate === 'decrement') {
        user?.decrement('integral', {
          by: params.value
        });
      } else if (params.operate === 'increment') {
        user?.increment('integral', {
          by: params.value
        });
      }
    } else if (params.type === RedemptionCodeTypeEnum.DAY) {
      let vipTime = user!.vip_expire_time;
      let svipTime = user!.svip_expire_time;
      const todayTime = new Date();
      if (vipTime < todayTime) {
        // 这里是否减去1毫秒
        vipTime = dayjs(todayTime).add(params.value, 'day').startOf('day').toDate();
      } else {
        vipTime = dayjs(vipTime).add(params.value, 'day').startOf('day').toDate();
      }
      if (params.level && params.level === 2) {
        if (svipTime! < todayTime) {
          // 这里是否减去1毫秒
          svipTime = dayjs(todayTime).add(params.value, 'day').startOf('day').toDate();
        } else {
          svipTime = dayjs(svipTime).add(params.value, 'day').startOf('day').toDate();
        }
      }
      await User.update({vip_expire_time: vipTime, svip_expire_time: svipTime}, {
        where: {
          id: params.user_id
        }
      });
    }
    return true;
  }

  static async addUserProductQuota(user_id: number, product: Product): Promise<boolean> {
    if (product && user_id) {
      let subscribeDay = 0;
      let integral = 0;
      let type: RedemptionCodeTypeEnum;
      if (product.type === ProductTypeEnum.INTEGRAL) {
        integral = product.value!;
        type = RedemptionCodeTypeEnum.INTEGRAL;
      } else if (product.type === ProductTypeEnum.DAY) {
        subscribeDay = product.value!;
        type = RedemptionCodeTypeEnum.DAY;
      }
      await User.updateUserVIP({
        user_id: user_id,
        value: integral ? integral : subscribeDay,
        type: type!,
        level: product.level,
        operate: 'increment'
      });
      return true;
    }
    return false;
  }
}

export {User};
