let product = require('./environment/product');
let test = require('./environment/test');
let dev = require('./environment/dev');
// 环境判断
let environment = {
  product,
  test,
  dev
};
if (!process.env) {
  environment = environment['dev'];
} else {
  environment = environment['process.env'];
}

module.exports = {
  environment,
  httpPort: 8081,
  // httpsPort: 8080,
  httpsPort: 0, // 0 关闭 https端口号
  // https证书
  privateKey: '/path/to/private.pem',
  certificate: '/path/to/file.crt',
  // token私钥
  toKenKey: 'gaoxiang',
  // token过期时间
  toKenTime: '7d',
  // 是否为开发环境(优先)
  isDev: true
};
