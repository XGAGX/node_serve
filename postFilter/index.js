let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');
let config = require('../environment/config');
let files = fs.readdirSync(__dirname);
let modules = {};

console.log(files);
files.forEach(file => {
  let _file = path.basename(file, '.js');
  let _path = path.join(__dirname, '/', file);
  let stats = fs.statSync(_path);
  if (_file !== 'index' && !stats.isDirectory()) {
    console.log('post>>>', '/' + _file);
    // 导入对应文件并且创建路由
    modules[_file] = require(_path);
    router.post('/' + _file + '/:param', async function (req, res, next) {
      // 是否有这个模块
      if (modules[_file]) {
        // 返回数据封装
        let returnData = {
          data: null,
          code: 200,
          mas: ''
        };
        // 权限判断
        let pass = true;
        if (config.privateModule.indexOf(_file) !== -1) {
          pass = await privateModule(req, res, returnData);
        }
        if (pass) {
          let data = await modules[_file](req, returnData);
          returnData['data'] = data;
        }
        res.send(returnData);
      } else {
        next();
      }
    });
  }
});
// 权限判断
async function privateModule (req, res, returnData) {
  // ...............
  // next();
  // modules(req, res, next);
  // res.send('哈哈你没权限');
  returnData.mas = '你没权限';
  returnData.code = 0;
  return false;
}
module.exports = router;
