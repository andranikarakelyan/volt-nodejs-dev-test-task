import {Queue} from 'bullmq';
import {APP_QUEUE, EBullMQJob, IGenerateReportJobArg} from "./bullmq.client.types";
import {bullMQConnectionConfig} from "./connection.config";

export class BullMQClient {

  private static _queue: Queue;

  public static async connect() {

    this._queue = new Queue(APP_QUEUE, {
      connection: bullMQConnectionConfig
    });

  }

  public static async addReportGenerationJob(data: IGenerateReportJobArg) {
    await this._queue.add(EBullMQJob.REPORT_GENERATION, data);
  }

}