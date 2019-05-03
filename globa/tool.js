let jwt = require('jsonwebtoken');
let config = require('../config');
module.exports = {
  // 创建token
  createToken (data, req) {
    let tken = null;
    try {
      if (req) {
        data['ip'] = req.ip;
      }
      tken = jwt.sign(data, config.toKenKey, { expiresIn: config.toKenTime });
    } catch (error) {
      tken = null;
    }
    return tken;
  },
  // 解密toKen
  toKenToData (toKen) {
    let data = null;
    try {
      data = jwt.verify(toKen, config.toKenKey);
    } catch (error) {
      data = null;
    }
    return data;
  }
};
