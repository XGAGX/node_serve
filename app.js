let express = require('express');
let app = express();
let path = require('path');
let http = require('http');
let bodyParser = require('body-parser');
// 导入配置
let config = require('./config');
// 创建服务
let httpServer = http.createServer(app);
// app配置
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 处理post
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// 静态文件夹
app.use(express.static(path.join(__dirname, 'public')));
// 处理跨域
app.all('*', function (req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  next();
});
// 导入路由
let mainRouter = require('./routes');
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
