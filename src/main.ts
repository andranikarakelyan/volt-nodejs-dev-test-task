import {startServer} from "./server";
import {DbClient} from "./db/DbClient";

async function main() {
  await DbClient.connect();
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