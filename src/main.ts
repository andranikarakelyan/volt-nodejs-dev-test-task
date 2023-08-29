import {startServer} from "./server";
import {DbClient} from "./db/DbClient";
import {BullMQClient} from "./bullmq/bullmq.client";

process.chdir(__dirname);

async function main() {
  await DbClient.connect();
  await BullMQClient.connect();
  await startServer();
}

main()
  .then(() => {
    console.log('App started');
  })
  .catch(err => {
    console.error('App start error', err);
    process.exit(1);
  })