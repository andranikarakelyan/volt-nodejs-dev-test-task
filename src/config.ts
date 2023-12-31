import * as dotenv from 'dotenv';

dotenv.config({override: true, path: '.env'});
dotenv.config({override: true, path: '.env.local'});

export const AppConfig = {
  server_port: Number(process.env.SERVER_PORT),
  postgres: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    db: process.env.POSTGRES_DB,
  },
  postgres_public: {
    user: process.env.POSTGRES_PUBLIC_USER,
    password: process.env.POSTGRES_PUBLIC_PASSWORD,
    host: process.env.POSTGRES_PUBLIC_HOST,
    port: Number(process.env.POSTGRES_PUBLIC_PORT),
    db: process.env.POSTGRES_PUBLIC_DB,
  },
  jwt_secret: String(process.env.JWT_SECRET),
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  },
  aws: {
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET,
  },
}
