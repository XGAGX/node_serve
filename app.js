const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// 导入配置
const config = require('./config');
// 创建服务
const httpServer = http.createServer(app);
// app配置
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// 静态文件夹
app.use(express.static(path.join(__dirname, 'public')));
// 全局处理
app.all('*', function (req, res, next) {
  // 处理跨域
  res.append('Access-Control-Allow-Origin', '*');
  res.append('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Auth, Accept,X-Requested-With');
  res.append('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') {
    res.append('Access-Control-Max-Age', '600'); // 前端缓存OPTIONS请求10分钟,减少OPTIONS请求
    res.sendStatus(200);
  } else {
    next();
  }
});
// 导入子路由
const mainRouter = require('./routes');
app.use('/', mainRouter);
// 启动服务
httpServer.listen(config.httpPort, function () {
  console.log('HTTP 服务启动', config.httpPort);
});
// 判断是否要启动https
if (config.httpsPort !== 0) {
  require('./https')(app);
}
module.exports = app;
