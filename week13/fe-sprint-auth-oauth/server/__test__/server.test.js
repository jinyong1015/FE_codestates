const app = require('../index');
const request = require('supertest');
const https = require('https');
const agent = request.agent(app);
const { expect, assert } = require('chai');
const nock = require('nock');
require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const serverResource = require('../data/data');

//mkcert에서 발급한 인증서를 사용하기 위한 코드입니다. 삭제하지 마세요!
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const accessTokenRequestBody = {
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  code: 'fake_auth_code',
};

const accessTokenResponseData = {
  access_token: 'fake_access_token',
  token_type: 'Bearer',
  scope: 'user',
};

const callbackRequestBody = {
  authorizationCode: 'fake_auth_code',
};

describe('.env', () => {
  it(`dotenv를 통해 CLIENT_ID를 가져와야 합니다.`, async () => {
    expect(CLIENT_ID).to.exist;
  });

  it(`dotenv를 통해 CLIENT_SECRET를 가져와야 합니다.`, async () => {
    expect(CLIENT_SECRET).to.exist;
  });
});

describe('Auth - Server', () => {

  describe('controller/callback.js', () => {
    it('authorization callback에 대한 handler에서는 GitHub Access Token 요청을 처리할 수 있어야 합니다.', async () => {
      const scope = nock('https://github.com')
        .post('/login/oauth/access_token', accessTokenRequestBody)
        .reply(200, accessTokenResponseData);

      await agent.post('/callback').send(callbackRequestBody);

      const ajaxCallCount = scope.interceptors[0].interceptionCounter;
      expect(ajaxCallCount, '요구사항에 맞는 ajax 요청을 보내지 않았습니다.').to.eql(1);
    });

    it('Access Token을 받아온 후에는, 클라이언트에 응답으로 전달해줘야 합니다.', async () => {
      nock('https://github.com')
        .post('/login/oauth/access_token', accessTokenRequestBody)
        .reply(200, accessTokenResponseData);

      const response = await agent.post('/callback').send(callbackRequestBody);

      expect(response.statusCode).to.eql(200);
      expect(response.body.accessToken).to.eql('fake_access_token');
    });
  });
});
