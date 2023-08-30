import {Sequelize} from "sequelize-typescript";
import {AppConfig} from "../config";
import {PostModel} from "./models/Post.model";
import {CommentModel} from "./models/Comment.model";
import {UserModel} from "./models/User.model";
import {ChangeModel} from "./models/Change.model";

export class DbClient {

  public static sequalize: Sequelize = new Sequelize({
    dialect: 'postgres',
    host: AppConfig.db.host,
    port: AppConfig.db.port,
    username: AppConfig.db.user,
    password: AppConfig.db.password,
    database: AppConfig.db.db,
    logging: false,
    models: [
      PostModel,
      CommentModel,
      UserModel,
      ChangeModel,
    ],
  });

  public static async connect() {
    await this.sequalize.authenticate();
    await this.sequalize.sync({alter: true, logging: false});
  }

}
