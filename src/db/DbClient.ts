import {Sequelize} from "sequelize-typescript";
import {AppConfig} from "../config";
import {PostModel} from "./models/Post.model";
import {CommentModel} from "./models/Comment.model";
import {UserModel} from "./models/User.model";
import {ChangeModel} from "./models/Change.model";

export class DbClient {

  public static sequalize: Sequelize;

  public static async connect(connectToPublic: boolean = false) {

    const postgres_cfg = connectToPublic ? AppConfig.postgres_public : AppConfig.postgres;

    this.sequalize = new Sequelize({
      dialect: 'postgres',
      host: postgres_cfg.host,
      port: postgres_cfg.port,
      username: postgres_cfg.user,
      password: postgres_cfg.password,
      database: postgres_cfg.db,
      logging: false,
      models: [
        PostModel,
        CommentModel,
        UserModel,
        ChangeModel,
      ],
    })
    await this.sequalize.authenticate();
    await this.sequalize.sync({alter: true, logging: false});
  }

}
