import {Worker, Job} from 'bullmq';
import {APP_QUEUE, EBullMQJob, IGenerateReportJobArg} from "../bullmq.client.types";
import {bullMQConnectionConfig} from "../connection.config";
import {generateReport} from "./generateReport";

export const appWorker = new Worker(
  APP_QUEUE,
  async (job: Job) => {
    try {
      console.log(`Job ${ job.name }#${job.id} starting...` );
      switch ( job.name ) {
        case EBullMQJob.REPORT_GENERATION:
          await generateReport(job.data as IGenerateReportJobArg);
          break;
        default:
          throw new Error(`Unknown job '${ job.name }'`);
      }

      console.log(`Job ${ job.name }#${job.id} successfully completed`);
    }
    catch ( error: any ) {
      console.error(`Job ${ job.name }#${job.id} error`, error.message);
    }

    return 1;
  },
  {autorun: false, connection: bullMQConnectionConfig,},
);

