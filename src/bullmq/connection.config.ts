import {AppConfig} from "../config";

export const bullMQConnectionConfig = {
  host: AppConfig.redis.host,
  port: AppConfig.redis.port,
  password: AppConfig.redis.password,
}