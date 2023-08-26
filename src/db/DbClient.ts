import {Sequelize} from "sequelize";
import {AppConfig} from "../config";

export class DbClient {

  private static _sequalize: Sequelize;

  public static init() {
    this._sequalize = new Sequelize({
      dialect: 'postgres',
      host: AppConfig.db.host,
      port: 5432,
      username: AppConfig.db.user,
      password: AppConfig.db.password,
      database: AppConfig.db.db,
    });
  }

  public static async connect() {
    await new Promise( resolve => setTimeout(resolve, 10_000) )
    await this._sequalize.authenticate();
  }

}

DbClient.init();