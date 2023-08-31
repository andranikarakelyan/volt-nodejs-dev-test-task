import chai from "chai";
import chaiHttp from 'chai-http';
import {describe} from "mocha";
import {DbClient} from "../src/db/DbClient";

chai.use(chaiHttp);

//FIXME: Load host from env variables
export const agent = chai.request('http://localhost:4000');
export const graphqlAgent = chai.request('http://localhost:4000/api/graphql')


describe('Server tests', async () => {
  before(async () => {
    await DbClient.connect(true);
    console.log('connected db');
  });
  require('./common.tests');
  require('./users.tests');
});






