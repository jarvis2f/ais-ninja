import {DataTypes} from 'sequelize';
import {WhereOptions} from "sequelize/types/model";
import {Column, Model, Table} from "sequelize-typescript";

enum ProductTypeEnum {
  INTEGRAL = 'integral',
  DAY = 'day',
}

interface ProductAttributes {
  id?: number;
  title: string;
  price: number;
  original_price: number | null;
  value: number | null;
  badge: string | null;
  status: number;
  create_time: Date;
  update_time: Date;
  type: ProductTypeEnum | null;
  level: number;
}

@Table({
  tableName: 'product',
  underscored: true,
  deletedAt: false,
  createdAt: 'create_time',
  updatedAt: 'update_time',
  initialAutoIncrement: '10000'
})
class Product extends Model<ProductAttributes> implements ProductAttributes {
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
  })
  public title!: string;
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  public price!: number;
  @Column({
    type: DataTypes.INTEGER,
    allowNull: true,
  })
  public original_price!: number | null;
  @Column({
    type: DataTypes.INTEGER,
    allowNull: true,
  })
  public value!: number | null;
  @Column({
    type: DataTypes.STRING(50),
    allowNull: true,
  })
  public badge!: string | null;
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '1为正常',
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
  })
  public update_time!: Date;
  @Column({
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'integral 或 day',
  })
  public type!: ProductTypeEnum | null;
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '会员级别 1 会员 2 专业版 3 商业版',
  })
  public level!: number;

  static async getProducts(page: number, page_size: number, where?: WhereOptions): Promise<{
    rows: Product[],
    count: number
  }> {
    return Product.findAndCountAll({
      where: where,
      offset: page * page_size,
      limit: page_size,
      order: [['create_time', 'DESC']]
    });
  }

  static add(title: any, price: any, original_price: any, value: any, badge: any, type: any, level: any, status: any): Promise<Product> {
    return Product.create({
      title, price, original_price, value, badge, type, level, status
    } as ProductAttributes);
  }

  static edit(id: any, title: any, price: any, original_price: any, value: any, badge: any, type: any, level: any, status: any): Promise<[Product, (boolean | null)]> {
    return Product.upsert({
      id, title, price, original_price, value, badge, type, level, status
    } as ProductAttributes);
  }
}

export {Product, ProductTypeEnum};
