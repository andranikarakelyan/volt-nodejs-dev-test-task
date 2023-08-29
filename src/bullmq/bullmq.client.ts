import {Queue} from 'bullmq';
import {AppConfig} from "../config";

export class BullMQClient {

  public static async connect(){

    const myQueue = new Queue('test-queue', {
      connection: {
        host: AppConfig.redis.host,
        port: AppConfig.redis.port,
        password: AppConfig.redis.password,
      },
    });

    await myQueue.add('myJobName1', { job1: 'bar' });
  }

}