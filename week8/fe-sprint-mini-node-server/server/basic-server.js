const http = require('http');

const PORT = 4999;

const ip = 'localhost';

const server = http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];
  request.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    // 여기서 `body`에 전체 요청 바디가 문자열로 담겨있습니다.
  

  if (request.method === 'POST' && request.url === '/lower') {
      response.writeHead(200, defaultCorsHeader)
      response.end(body.toLowerCase())
  
  } else if (request.method === 'POST' && request.url === '/upper') {
    response.writeHead(200, defaultCorsHeader)
      response.end(body.toUpperCase())
  } else if (request.method === 'OPTIONS') {
    response.writeHead(200, defaultCorsHeader);
    response.end();
  } 
 /* if (request.method === 'OPTIONS') {
    response.writeHead(200, defaultCorsHeader);
    response.end();
    return;
  }
  let body = [];
  if (request.method === 'POST' && request.url === '/lower') {
  request.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString().toLowerCase();
    response.writeHead(200, defaultCorsHeader);
    response.end(body);
    return;
  });
  } 
  else if (request.method === 'POST' && request.url === '/upper') {
    request.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString().toUpperCase();
    response.writeHead(200, defaultCorsHeader);
    response.end(body);
    return;
  }); 
  } */
  else {
    response.statusCode = 404;
    response.end();
  } 
});
});

server.listen(PORT, ip, () => {
  console.log(`http server listen on ${ip}:${PORT}`);
});

const defaultCorsHeader = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Access-Control-Max-Age': 10
};
