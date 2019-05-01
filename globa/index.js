/**
 * 公用方法
 */
let tool = require('./tool');
module.exports = {
  tool,
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
  }

};
