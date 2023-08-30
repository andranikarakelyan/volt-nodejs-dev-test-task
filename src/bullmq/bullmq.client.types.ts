export enum EBullMQJob {
  REPORT_GENERATION = 'REPORT_GENERATION',
}

export interface IJobReportGeneration {
  start_date: Date;
  end_date: Date;
  email: string;
}