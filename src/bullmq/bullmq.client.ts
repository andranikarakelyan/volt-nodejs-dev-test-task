import {Queue} from 'bullmq';
import {AppConfig} from "../config";
import {EBullMQJob, IJobReportGeneration} from "./bullmq.client.types";

export class BullMQClient {

  private static _queue: Queue;

  public static async connect() {

    this._queue = new Queue('app-queue', {
      connection: {
        host: AppConfig.redis.host,
        port: AppConfig.redis.port,
        password: AppConfig.redis.password,
      },
    });
  }

  public static async addReportGenerationJob(data: IJobReportGeneration) {
    await this._queue.add(EBullMQJob.REPORT_GENERATION, data);
  }

}