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
    console.log('get>>>', '/' + _file);
    modules[_file] = require(_path);
    router.get('/' + _file, function (req, res, next) {
      if (modules[_file]) {
        // 权限判断
        if (config.privateModule.indexOf(_file) !== -1) {
          privateModule(req, res, next, modules[_file]);
        } else {
          modules[_file](req, res, next);
        }
      } else {
        next();
      }
    });
  }
});
// 权限判断
function privateModule (req, res, next, modules) {
  // ...............
  // next();
  res.send('哈哈你没权限');
  // modules(req, res, next);
}
module.exports = router;
