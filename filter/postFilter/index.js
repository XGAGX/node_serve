/**
 * post请求路由(二级路由)
 */
let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');
let config = require('../../environment');
let globa = require('../../globa');
let files = fs.readdirSync(path.join(__dirname, '/controller'));
let modules = {};

console.log('post>>>', files);
files.forEach(file => {
  let _file = path.basename(file, '.js');
  let _path = path.join(__dirname, '/controller/', file);
  let stats = fs.statSync(_path);
  if (stats.isDirectory()) {
    console.log('post>>>', '/' + _file);
    // 导入对应文件并且创建路由
    modules[_file] = require(_path);
    router.post('/' + _file + '/:param', async function (req, res, next) {
      // 是否有这个模块
      if (modules[_file]) {
        let pass = globa.setReturnObj();
        let user = globa.user.getUser(req);
        // 权限判断
        if (config.privateModule.indexOf(_file) !== -1) {
          pass.mag = await privateModule(user);
        }
        if (pass.mag === '') {
          let data = await modules[_file](user);
          pass['data'] = data;
        } else {
          // 设置响应码
          globa.returnError(res);
        }
        res.send(pass);
      } else {
        next();
      }
    });
    router.post('/' + _file, function (req, res, next) {});
  }
});

/**
 *权限判断
 *
 * @param {*} user
 * @returns 返回原因,空字串为通过
 */
async function privateModule (user) {
  return '你没权限';
}
module.exports = router;
