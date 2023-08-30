export interface IGenerateReportArg {
  start_date: Date,
  end_date: Date,
  email: string,
}

export interface IGenerateReportResult {
  message: String,
}