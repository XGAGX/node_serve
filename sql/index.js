const config = require('../config');
const Sequelize = require('sequelize');
// const fs = require('fs');
const sqlConfig = config.sql;
console.log('数据库>>连接中');
const sequelize = new Sequelize(sqlConfig.database, sqlConfig.username, sqlConfig.password, { ...sqlConfig });
const db = {
  Sequelize,
  sequelize,
  user: sequelize.import('./user.model')
};
// 同步数据库(没有对应表则根据模型创建)
sequelize.sync();
console.log('数据库>>初始化');
// sequelize.import
// let files = fs.readdirSync('./');
// files.forEach(fileName => {
//   console.log(fileName);
// });
module.exports = db;
