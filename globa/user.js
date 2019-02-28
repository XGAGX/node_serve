/**
 * 用户信息相关
 * 进入模块之前获取用户信息
 */
let jwt = require('jsonwebtoken');
let config = require('../config');
module.exports = {
  // 获取用户信息
  getUser (req) {
    // path: req.path, query: req.query, params: req.params
    const IP = req.ip.split(':');
    let IPv4 = null;
    let IPv6 = null;
    if (IP.length > 1) {
      IPv4 = IP[IP.length - 1];
      IPv6 = IP.slice(0, -1).join(':');
    } else {
      IPv4 = IP[IP.length - 1];
    }
    let headers = req.headers;
    let auth = null;
    let newToKen = null;
    if (headers.auth) {
      auth = this.toKenToData(headers.auth);
    } else {
      newToKen = this.createToken(req.cookies);
    }
    let user = {
      baseUrl: req.baseUrl,
      path: req.path,
      query: req.query,
      module: req.params.param,
      ip: IPv4,
      ipv6: IPv6,
      cookies: req.cookies,
      //   headers: req.headers,
      auth: auth,
      newToKen: newToKen
    };
    return user;
  },
  // 创建token
  createToken (data) {
    let tken = null;
    try {
      tken = jwt.sign(data, config.toKenKey, { expiresIn: config.toKenTime });
    } catch (error) {
      tken = null;
    }
    return tken;
  },
  // 解密toKen
  toKenToData (toKen) {
    let data = null;
    try {
      data = jwt.verify(toKen, config.toKenKey);
    } catch (error) {
      data = null;
    }
    return data;
  }
};
