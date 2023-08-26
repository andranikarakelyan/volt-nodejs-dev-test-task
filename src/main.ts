import {startServer} from "./server";

async function main() {
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