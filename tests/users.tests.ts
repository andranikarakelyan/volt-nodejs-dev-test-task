import {describe} from "mocha";
import {graphqlAgent} from "./main";
import {UserModel} from "../src/db/models/User.model";
import {expect} from "chai";

describe('Users API', () => {

  describe('Users login API', async () => {

    it( 'Should generate token with valid user credentials', async () => {

      const user_data = {
        nickname: 'test-nickname',
        email: 'test@email.com',
        password: 'test-password',
      };

      await UserModel.create(user_data)

      const res = await graphqlAgent.post('').send({
        query: `mutation login($arg: LoginArg!){
          login(arg: $arg) {
            token
          }
        }`,
        variables: {
          arg: {
            email: user_data.email,
            password: user_data.password,
          },
        },
      });

      expect(res).to.have.status(200);
      expect(res.headers['content-type']).to.include('application/json');
      expect(res.body).to.have.nested.property('data.login.token').is.a('string');
      expect(res.body.data.login.token.split('.')).have.length(3);


    } );

    it( 'Should throw error with invalid user credentials', async () => {

      const user_data = {
        nickname: 'invalid-test-nickname',
        email: 'invalid-test@email.com',
        password: 'invalid-test-password',
      };

      const res = await graphqlAgent.post('').send({
        query: `mutation login($arg: LoginArg!){
          login(arg: $arg) {
            token
          }
        }`,
        variables: {
          arg: {
            email: user_data.email,
            password: user_data.password,
          },
        },
      });

      expect(res).to.have.status(200);
      expect(res.headers['content-type']).to.include('application/json');
      expect(res.body).to.have.nested.property('errors[0].extensions.code').eq('NOT_FOUND');
      expect(res.body).to.have.nested.property('errors[0].message').eq('User not found');


    } );

  })

})