
export const APP_QUEUE = 'app-queue';
export enum EBullMQJob {
  REPORT_GENERATION = 'REPORT_GENERATION',
}

export interface IGenerateReportJobArg {
  start_date: Date;
  end_date: Date;
  email: string;
}