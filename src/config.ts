import * as dotenv from 'dotenv';

dotenv.config();

export const AppConfig = {
  server_port: Number(process.env.SERVER_PORT),
  db: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    db: process.env.POSTGRES_DB,
  },
  jwt_secret: String(process.env.JWT_SECRET),
}