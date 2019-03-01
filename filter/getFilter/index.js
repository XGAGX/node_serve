/**
 * post请求路由(二级路由)
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const config = require('../../config');
const globa = require('../../globa');
const files = fs.readdirSync(path.join(__dirname, '/controller'));
let modules = {};
const getPrivateModule = config.environment.getPrivateModule;
console.log('get>>>', files);
files.forEach(file => {
  let _file = path.basename(file, '.js');
  let _path = path.join(__dirname, '/controller/', file);
  let stats = fs.statSync(_path);
  if (stats.isDirectory()) {
    console.log('get>>>', '/' + _file);
    // 导入对应文件并且创建路由
    modules[_file] = require(_path);
    // 带param
    router.get('/' + _file + '/:param', handleRouter(_file));
    // 不带param
    router.get('/' + _file, handleRouter(_file));
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

/**
 *根据路径创建路由处理函数
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function handleRouter (_file) {
  return async function (req, res, next) {
    // 是否有这个模块
    if (modules[_file]) {
      let pass = globa.setReturnObj();
      let user = globa.user.getUser(req);
      // 权限判断
      if (getPrivateModule.indexOf(_file) !== -1) {
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
  };
}

module.exports = router;
