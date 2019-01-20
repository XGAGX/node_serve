module.exports = {
  httpPort: 8081,
  httpsPort: 0, // 0 关闭
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
