import {describe, it} from "mocha";
import {expect} from "chai";
import {agent} from "./main";
import fs from 'fs';

describe('Server common tests', () => {

  describe( 'Status check', async () => {
    it('GET /api/status: Server status check', async () => {
      const res = await agent.get('/api/status');

      expect(res).to.have.status(200);
      expect(res.headers['content-type']).to.include('application/json');
      expect(res.body).to.deep.eq({status: 'success'});
    });

  } );

  it('"/" route and no route should open main html', async () => {
    const responses = await Promise.all([
      agent.get(''), agent.get('/'),
    ]);

    for (const res of responses) {
      expect(res).to.have.status(200);
      expect(res.headers['content-type']).to.include('text/html');
      expect(res.text).to.eq(fs.readFileSync( 'src/public/index.html' ).toString());
    }
  });

  it( 'should return a 404 Not Found response for invalid routes', async () => {

    const responses = await Promise.all([
      agent.post('/api/status'),
      agent.get('/invalid'),
      agent.post('/index.html'),
      agent.get('/sitemap.xml'),
      agent.get('/robots.txt'),
      agent.get('/dev'),
    ]);

    for (const res of responses) {
      expect(res).to.have.status(404);
      expect(res.headers['content-type']).to.include('application/json');
      expect(res.body).to.have.property('errors').that.is.an('array');
    }

  });

});