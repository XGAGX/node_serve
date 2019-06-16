let production = require('./environment/production');
let test = require('./environment/test');
let development = require('./environment/development');
const config = { // 全局配置
  httpPort: 8080,
  // httpsPort: 8080,
  httpsPort: 8081, // 0 关闭 https端口号
  // https SSL证书
  privateKey: './config/localhost_8081.key',
  certificate: './config/localhost_8081.crt',
  // token私钥
  toKenKey: '1666', // 随机数 Math.random().toString(36).substr(2);
  // token过期时间(d M m )
  toKenTime: '1m',
  // 是否为忽略env直接设置为开发环境(优先)
  isDev: true,
  // sql配置
  sql: {
    database: 'gaoxiang', // 数据库名称
    username: 'root', // 帐号
    password: null, // 密码
    host: 'localhost', // 数据库IP
    port: 3306, // 端口
    dialect: 'mysql', // 数据库类型'mysql'|'sqlite'|'postgres'|'mssql',
    pool: {// 连接池配置
      max: 5, // 最大连接数
      min: 0, // 最小连接数
      acquire: 30000, // 超时ms
      idle: 10000// 允许空闲时间ms,控制空闲的连接大于最小连接数后会断开时长
    }
  }
};
/// ////////////////// 初始化 ///////////////////////////
// 环境判断
let environment = {
  production, // 生产环境
  test, // 测试环境
  development// 开发环境
};
// 根据环境载入配置
if (!process.env.NODE_ENV) {
  environment = environment['development'];
} else {
  environment = environment[process.env.NODE_ENV];
}
// 环境配置与全局配置合并
Object.assign(config, environment);
console.log('toKenKey>>', config.toKenKey);
module.exports = config;
