import {BullMQClient} from "./bullmq/bullmq.client";
import {CloudStorageClient} from "./cloud_storage/CloudStorage.client";
import {appWorker} from "./bullmq/worker/app.worker";
import {DbClient} from "./db/DbClient";

async function main() {

  await CloudStorageClient.connect();
  await DbClient.connect();
  await BullMQClient.connect();
  console.log('Connected to BullMQ');
  console.log('Starting workers...');
  await appWorker.run();

}

main()
  .then(() => {
    console.log('App started');
  })
  .catch(err => {
    console.error('App start error', err);
    process.exit(1);
  })