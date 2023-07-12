const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const fs = require('fs');
const https = require('https');
const controllers = require('./controllers');
const app = express();

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;
//mkcert에서 발급한 인증서를 사용하기 위한 코드입니다. 삭제하지 마세요!
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  /* TODO: CORS 설정이 필요합니다. 클라이언트가 어떤 origin인지에 따라 달리 설정할 수 있습니다.
   * 메서드는 GET, POST, OPTIONS, DELETE를 허용합니다.
   */
  origin: true,
  methods: ['GET', 'POST', 'OPTIONS', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

app.post('/callback', controllers.callback);
app.post('/userinfo', controllers.userInfo);
app.delete('/logout', controllers.logout);
app.get('/', (req, res) => {
  res.send('서버에 연결이 되었습니다.')
})


// (Optional) https 서버를 실행합니다.
// 아래 코드는 인증서 파일이 존재하지 않는 경우에는 http 서버를, 존재하는 경우에는 https 서버를 실행합니다.
// OAuth 과제도 앞서 진행한 과제들과 마찬가지로 https 서버가 꼭 필요한 것은 아닙니다.
// https 프로토콜을 사용하는 서버를 실행해보고 싶다면, mkcert를 사용해 인증서 파일을 server 폴더 안에 만들어주세요.
let server;
if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
  const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
  const credentials = {
    key: privateKey,
    cert: certificate,
  };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log(`🚀 HTTPS Server is starting on ${HTTPS_PORT}`));
} else {
  server = app.listen(HTTPS_PORT, () => console.log(`🚀 HTTP Server is starting on ${HTTPS_PORT}`));
}
module.exports = server;
