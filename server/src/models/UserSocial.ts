import {DataTypes} from 'sequelize';
import {Column, Model, Table} from "sequelize-typescript";

enum UserSocialTypeEnum {
  GOOGLE = 'google',
}

interface UserSocialAttributes {
  id?: number;
  user_id: number;
  type: UserSocialTypeEnum;
  social_id: string;
  create_time: Date;
  update_time: Date;
}

@Table({
  tableName: 'user_social',
  underscored: true,
  deletedAt: false,
  createdAt: 'create_time',
  updatedAt: 'update_time',
  hooks: {}
})
class UserSocial extends Model<UserSocialAttributes> implements UserSocialAttributes {
  @Column({
    type: DataTypes.BIGINT({unsigned: true}),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  declare public id: number;
  @Column({
    type: DataTypes.BIGINT,
    allowNull: false
  })
  public user_id!: number;
  @Column({
    type: DataTypes.STRING,
    allowNull: false
  })
  public type!: UserSocialTypeEnum;
  @Column({
    type: DataTypes.STRING,
    allowNull: false
  })
  public social_id!: string;
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

  public static async getUserSocial(type: UserSocialTypeEnum, social_id: string): Promise<UserSocial | null> {
    return await UserSocial.findOne({
      where: {
        type,
        social_id
      }
    });
  }

  static async add(user_id: number, type: UserSocialTypeEnum, social_id: string): Promise<UserSocial> {
    // @ts-ignore
    const userSocial: UserSocialAttributes = {
      user_id: user_id,
      type: type,
      social_id: social_id,
    }
    return await UserSocial.create(userSocial);
  }
}


export {UserSocial, UserSocialTypeEnum};
