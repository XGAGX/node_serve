/**
 * 公用方法
 */
let user = require('./user');
module.exports = {
  // 模块
  user,
  /**
   *创建响应格式
   *
   * @param {*} [data=null]
   * @param {number} [code=200]
   * @param {string} [mag='']
   * @returns
   */
  setReturnObj (data = null, code = 200, mag = '') {
    return { data: data, code: code, mag: mag };
  },

  /**
   *设置错误响应码
   * @param {*} res
   * @param {number} [code=401]
   */
  returnError (res, code = 401) {
    res.status(code);
  }
};
