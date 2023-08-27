import {DataTypes, Sequelize} from "sequelize";
import {AppConfig} from "../config";

export class DbClient {

  public static sequalize: Sequelize = new Sequelize({
    dialect: 'postgres',
    host: AppConfig.db.host,
    port: AppConfig.db.port,
    username: AppConfig.db.user,
    password: AppConfig.db.password,
    database: AppConfig.db.db,
  });

  public static async connect() {
    await this.sequalize.authenticate();
    await this.sequalize.sync({alter: true});
  }

}

//FIXME: Nicely move to another folder and create nice model loading system
export const PostEntity = DbClient.sequalize.define(
  'Post',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.INTEGER,
    },
    published_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'posts',
  }
);

//FIXME: Nicely move to another folder and create nice model loading system
export const CommentEntity = DbClient.sequalize.define(
  'Comment',
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.INTEGER,
    },
    published_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'comments',
  }
);

//FIXME: Nicely move to another folder and create nice model loading system
export const UserEntity = DbClient.sequalize.define(
  'User',
  {
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
  }
);

//FIXME: Nicely move to another folder and create nice model loading system
export const ChangeEntity = DbClient.sequalize.define(
  'Change',
  {
    table_name: {
      type: DataTypes.STRING,
    },
    table_id: {
      type: DataTypes.INTEGER,
    },
    changed_at: {
      type: DataTypes.DATE,
    },
    data: {
      type: DataTypes.JSONB,
    },
    action: {
      type: DataTypes.ENUM('insert', 'delete'),
    },
  },
  {
    tableName: 'changes',
  },
);