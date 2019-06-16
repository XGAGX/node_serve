
module.exports = function (app) {
  let fs = require('fs');
  let https = require('https');
  // 导入配置
  let config = require('./config');
  // 导入证书
  let privateKey = fs.readFileSync(config.privateKey, 'utf8');
  let certificate = fs.readFileSync(config.certificate, 'utf8');
  let credentials = { key: privateKey, cert: certificate };
  // 创建服务
  let httpsServer = https.createServer(credentials, app.callback());
  httpsServer.listen(config.httpsPort, function () {
    console.log('HTTPS 服务启动', config.httpsPort);
  });
};
