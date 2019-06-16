const Koa = require('koa');
const app = new Koa();
const path = require('path');
const http = require('http');
const koaBody = require('koa-body'); // 代替 koa-bodyparser 和 koa-multer
const koaStatic = require('koa-static'); // 静态文件夹
// 导入配置
const config = require('./config');
// 创建服务
const httpServer = http.createServer(app.callback());
// 中间件
app.use(koaBody({
  multipart: true, // 支持文件上传,默认false,文件在ctx.request.files里
  jsonLimit: '5mb', // JSON 数据体的大小限制,默认1mb
  formLimit: '5mb', //  表单大小限制
  // encoding: 'gzip', // 表单的默认编码,默认值utf-8
  formidable: {
    maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
    uploadDir: path.join(__dirname, 'public/upload/') // 设置上传目录
  },
  onError: () => {} // 错误处理
}));
// 静态文件夹
app.use(koaStatic(path.join(__dirname, 'public')));
// 全局处理
app.use(async (ctx, next) => {
  const res = ctx.response;
  const req = ctx.request;
  // 处理跨域
  res.append('Access-Control-Allow-Origin', '*');
  res.append('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Auth, Accept,X-Requested-With');
  res.append('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.status = 200;
  if (req.method === 'OPTIONS') {
    res.append('Access-Control-Max-Age', '600'); // 前端缓存OPTIONS请求10分钟,减少OPTIONS请求
  } else {
    ctx.status = 404; // 默认状态404,匹配上路由后会改为200
    await next();
  }
});

// 导入路由
const mainRouter = require('./routes');
app.use(mainRouter.routes());
app.use(mainRouter.allowedMethods());
// 启动服务
httpServer.listen(config.httpPort, function () {
  console.log('HTTP 服务启动', config.httpPort);
});
// 判断是否要启动https
if (config.httpsPort !== 0) {
  require('./https')(app);
}
// 启动定时任务
if (config.isCron) {
  require('./cron');
}

module.exports = app;
