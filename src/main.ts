import {startServer} from "./server";
import {DbClient} from "./db/DbClient";
import {BullMQClient} from "./bullmq/bullmq.client";
import {CloudStorageClient} from "./cloud_storage/CloudStorage.client";
import {AppConfig} from "./config";

process.chdir(__dirname);

async function main() {
  console.log( 'Loaded config\n', AppConfig );

  await DbClient.connect();
  await BullMQClient.connect();
  await CloudStorageClient.connect();
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