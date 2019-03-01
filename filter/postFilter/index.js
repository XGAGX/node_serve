/**
 * post请求路由(二级路由)
 */
let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');
let config = require('../../config');
let globa = require('../../globa');
const multer = require('multer');
let files = fs.readdirSync(path.join(__dirname, '/controller'));
const postPrivateModule = config.environment.postPrivateModule;
let modules = {};
// 上传文件路径临时储存位置设置
const upload = multer({ dest: './uploads' });

console.log('post>>>', files);
files.forEach(file => {
  let _file = path.basename(file, '.js');
  let _path = path.join(__dirname, '/controller/', file);
  let stats = fs.statSync(_path);
  if (stats.isDirectory()) {
    console.log('post>>>', '/' + _file);
    // 导入对应文件并且创建路由
    modules[_file] = require(_path);
    // 带param
    router.post('/' + _file + '/:param', upload.array('files', 10), handleRouter(_file));
    // 不带param
    router.post('/' + _file, upload.array('files', 10), handleRouter(_file));
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
      if (postPrivateModule.indexOf(_file) !== -1) {
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
