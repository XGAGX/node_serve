/**
 * 权限验证模块
 * 进入模块之前获取用户信息
 */
const globa = require('./index');
module.exports = function (req, res, next) {
//   req.info = user.getUser(req);
  let token = req.query.access_token || req.headers.access_token;
  let data = null;
  if (token) {
    data = globa.tool.toKenToData(token);
  }

  if (!data) {
    res.status(401).send(globa.setReturnObj(null, 401, '请重新登录'));
  } else {
    req.user = data;
    next();
  }
};
