// 模块的功能文件
// 不要在次文件内使用类似 res.send 的方法,数据返回即可
const globa = require('../../globa');
/**
 * 设置token数据
 */
module.exports.login = async function (req, res) {
  res.append('Set-Cookie', 'access_token=' + globa.tool.createToken(req.query));
  return req.IPv4;
};
/**
 * 显示token数据
 */
module.exports.showlogin = async function (req) {
  return req.user;
};
/**
 *上传文件测试
 */
module.exports.upload = async function (req) {
  return {
    originalname: req.files[0].originalname,
    size: req.files[0].size
  };
};
