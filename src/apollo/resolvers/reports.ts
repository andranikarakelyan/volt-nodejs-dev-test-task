import {BullMQClient} from "../../bullmq/bullmq.client";
import {IResolverArg} from "../types";
import {IGenerateReportArg, IGenerateReportResult} from "./reports.types";

export const ReportsResolvers = {
  mutations: {
    async generateReport(parent: unknown, {arg}: IResolverArg<IGenerateReportArg>): Promise<IGenerateReportResult> {

      await BullMQClient.addReportGenerationJob({
        start_date: arg.start_date,
        end_date: arg.end_date,
        email: arg.email,
      });

      return {
        message: 'Report generation started',
      };
    }
  },
  queries: {},
};