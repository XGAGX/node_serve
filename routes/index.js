/**
 * 总路由(一级路由)
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
// __dirname指向当前文件
console.log(path.join(__dirname, '../modules'));
const dirs = fs.readdirSync(path.join(__dirname, '../modules'));
// 读取modules文件夹下的目录并且创建路由,指向对应的index.js
dirs.forEach(dir => {
  let mod = require(path.join(__dirname, '../modules/' + dir));
  // 如果参数加密了请到setInfo里解密
  router.use('/' + dir, setInfo, mod);
});
// 处理404
router.use((req, res, next) => {
  res.sendStatus(404);
});

/**
   * 增加部分请求头信息,进入路由之前的操作(解密body之类的操作)
   *
   * @returns
   */
function setInfo (req, res, next) {
  const IP = req.ip.split(':');
  let IPv4 = null;
  let IPv6 = null;
  if (IP.length > 1) {
    IPv4 = IP[IP.length - 1];
    IPv6 = IP.slice(0, -1).join(':');
  } else {
    IPv4 = IP[IP.length - 1];
  }

  req['IPv4'] = IPv4;
  req['IPv6'] = IPv6;
  next();
}
module.exports = router;
