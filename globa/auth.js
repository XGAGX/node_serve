/**
 * 权限验证模块
 * 进入模块之前获取用户信息
 */
const globa = require('./index');
let config = require('../config');
module.exports = async function (ctx, next) {
  const res = ctx.response;
  const req = ctx.request;
  let token = req.query.access_token || req.headers.access_token;
  let toKenToData = null;
  if (token) {
    toKenToData = globa.tool.toKenToData(token);
    // if (req.ip !== toKenToData.ip) {
    //   toKenToData = null;
    // }
  }

  if (!toKenToData) {
    res.status = 401;
    res.body = globa.setReturnObj(null, 401, '请重新登录');
  } else {
    req.user = toKenToData;
    next();
  }
};
