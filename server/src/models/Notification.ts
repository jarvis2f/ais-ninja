import {DataTypes, Optional} from 'sequelize';
import {Column, Model, Table} from "sequelize-typescript";
import utils from "../utils";

interface NotificationAttributes {
  id?: number;
  title: string;
  content: string;
  sort?: number | null;
  status?: number | null;
  create_time?: Date | null;
  update_time?: Date | null;
}

interface NotificationCreationAttributes extends Optional<NotificationAttributes, 'id' | 'sort' | 'status' | 'create_time' | 'update_time'> {
}

@Table({
  tableName: 'notification',
  underscored: true,
  deletedAt: false,
  createdAt: 'create_time',
  updatedAt: 'update_time',
  initialAutoIncrement: '10000'
})
class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
  @Column({
    type: DataTypes.BIGINT({unsigned: true}),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  declare public id: number;
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    comment: '标题'
  })
  public title!: string;
  @Column({
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '内容'
  })
  public content!: string;
  @Column({
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1
  })
  public sort?: number | null;
  @Column({
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1
  })
  public status?: number | null;
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

  public static async getNormalNotifications(): Promise<Notification[]> {
    return Notification.findAll({
      where: {
        status: 1
      },
      order: [['sort', 'DESC']]
    });
  }

  public static async add(title: string, content: string, sort: number, status: number): Promise<Notification> {
    return Notification.create({
      title,
      content,
      sort,
      status
    } as NotificationAttributes);
  }

  public static async edit(id: any, title: any, content: any, sort: any, status: any): Promise<[Notification, (boolean | null)]> {
    return Notification.upsert({
      id,
      title,
      content,
      sort,
      status
    } as NotificationAttributes);
  }
}

export {Notification};
