import {DataTypes, Optional} from 'sequelize';
import {Column, Model, Table} from "sequelize-typescript";
import utils from "../utils";

interface MessageAttributes {
  id?: number;
  user_id: number;
  content: string;
  role: string;
  frequency_penalty?: number | null;
  max_tokens?: number | null;
  model?: string | null;
  presence_penalty?: number | null;
  temperature?: number | null;
  parent_message_id?: string | null;
  status: number;
  create_time: Date;
  update_time: Date;
}

interface MessageCreationAttributes extends Optional<MessageAttributes, 'frequency_penalty' | 'max_tokens' | 'model' | 'presence_penalty' | 'temperature' | 'parent_message_id'> {
}

@Table({
  tableName: 'message',
  underscored: true,
  deletedAt: false,
  createdAt: 'create_time',
  updatedAt: 'update_time',
  initialAutoIncrement: '10000'
})
class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
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
    defaultValue: 0,
  })
  public user_id!: number;

  @Column({
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  })
  public content!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  })
  public role!: string;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: true
  })
  public frequency_penalty?: number | null;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: true
  })
  public max_tokens?: number | null;

  @Column({
    type: DataTypes.STRING,
    allowNull: true
  })
  public model?: string | null;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: true
  })
  public presence_penalty?: number | null;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: true
  })
  public temperature?: number | null;

  @Column({
    type: DataTypes.STRING,
    allowNull: true
  })
  public parent_message_id?: string | null;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: true
  })
  public status!: number;

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
}

export {Message};
