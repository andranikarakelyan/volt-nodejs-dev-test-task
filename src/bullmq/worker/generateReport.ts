import {IGenerateReportJobArg} from "../bullmq.client.types";
import {ReportsDbApi} from "../../db/api/Reports.db.api";
import {CloudStorageClient} from "../../cloud_storage/CloudStorage.client";

export async function generateReport(arg: IGenerateReportJobArg) {
  const {users} = await ReportsDbApi.getUserActivityReport({
    from_date: arg.start_date,
    to_date: arg.end_date,
  });

  let csv = [
    ['nickname', 'email', 'posts_count', 'comments_count'],
    ...users.map(u => ([u.nickname, u.email, u.posts_count, u.comments_count]))
  ]
    .map(r => r.join(','))
    .join('\n');

  await CloudStorageClient.upload({
    file: csv,
    path: `reports/${new Date().toUTCString()}.csv`
  });

  return;

}