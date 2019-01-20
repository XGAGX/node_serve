let product = require('./product');
let test = require('./test');
let dev = require('./dev');
let config = require('../config');
module.exports = (() => {
  // 环境判断
  if (config.isDev) {
    return dev;
  } else if (process.env.product) {
    return product;
  } else {
    return test;
  }
})();
