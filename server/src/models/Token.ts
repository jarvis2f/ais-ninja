import {DataTypes} from 'sequelize';
import {Column, Model, Table} from "sequelize-typescript";
import {getLogger} from "../utils/logger";
import {supplierClientAgent} from "../ai";

const logger = getLogger('models/Token');

interface TokenAttributes {
  id?: number;
  key: string;
  host: string;
  remarks?: string | null;
  models?: string | null;
  limit?: number;
  usage?: number;
  status?: number;
  supplier?: string;
  create_time: Date;
  update_time: Date;
}

@Table({
  tableName: 'token',
  underscored: true,
  deletedAt: false,
  createdAt: 'create_time',
  updatedAt: 'update_time',
})
class Token extends Model<TokenAttributes> implements TokenAttributes {
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
    defaultValue: ''
  })
  public key!: string;
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  })
  public host!: string;
  @Column({
    type: DataTypes.STRING,
    defaultValue: null
  })
  public remarks?: string | null;
  @Column({
    type: DataTypes.STRING,
    defaultValue: null
  })
  public models?: string | null;
  @Column({
    type: DataTypes.DOUBLE,
    defaultValue: 0
  })
  public limit?: number;
  @Column({
    type: DataTypes.DOUBLE,
    defaultValue: 0
  })
  public usage?: number;
  @Column({
    type: DataTypes.INTEGER,
    defaultValue: 1
  })
  public status?: number;
  @Column({
    type: DataTypes.STRING,
    defaultValue: ''
  })
  public supplier?: string;
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

  public static async add(param: {
    models: any;
    supplier: string;
    host: any;
    key: any;
    remarks: any;
    status: any;
  }): Promise<Token> {
    return Token.create({
      ...param,
    } as TokenAttributes, {
      returning: true,
    });
  }

  public static async edit(param: {
    models: any;
    supplier: string;
    host: any;
    id: any;
    key: any;
    remarks: any;
    status: any
  }): Promise<[Token, (boolean | null)]> {
    return Token.upsert({
      ...param,
    } as TokenAttributes, {
      returning: true,
    });
  }

  public static async getChatModels() {
    return Token.findAll({
      where: {
        status: 1
      },
      raw: true
    }).then((tokens) => {
      if (tokens.length === 0) {
        logger.warn("No ChatGPT tokens provided");
        return;
      }
      let models = new Set(tokens.flatMap((token) => {
        return token.models?.split(",");
      }));
      return supplierClientAgent.getAllAvailableModels().filter((model) => {
        return models.has(model.value);
      });
    });
  }
}

export {Token};
