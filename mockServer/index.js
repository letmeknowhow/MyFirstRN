'use strict';

var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var PORT = 3001;

// 创建`express application`
var app = express();

app.set('port', PORT);

// bodyParser中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 静态资源`/public`
app.use(express.static(path.join(__dirname, 'public')));


// 404错误处理
app.use(function (req, res) {
  res.statusCode = 404;
  res.end(req.url + ' NOT FOUND');
});

// 开发环境错误处理
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

// 创建`http server`
var server = http.createServer(app);

// 启动侦听
server.listen(PORT);

// `server` error event
server.on('error', function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var port = PORT;

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' 端口号已被占用');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

// `server` listening event
server.on('listening', function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : addr.port;

  //console.log('worker' + cluster.worker.id + ' Listening on ' + bind);
  console.log('mockServer  running at http://127.0.0.1:' + bind);
});
