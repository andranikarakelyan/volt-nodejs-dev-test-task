import chai from "chai";
import chaiHttp from 'chai-http';
import {describe} from "mocha";

chai.use(chaiHttp);

//FIXME: Load host from env variables
export const agent = chai.request('http://localhost:4000');


describe('Server tests', async () => {
  await import('./common.tests');
})



