// 模块的功能文件
// 不要在次文件内使用类似 res.send 的方法,数据返回即可
const globa = require('../../globa');
const db = require('../../sql');
const moment = require('moment');
let config = require('../../config');

/**
 * 测试-设置token数据
 */
// module.exports.login = async function (req, res) {
//   res.append('Set-Cookie', 'access_token=' + globa.tool.createToken(req.query));
//   return req.IPv4;
// };
/**
 * 测试-显示token数据
 */
module.exports.showlogin = async function (req) {
  return {
    ...req.user,
    '到期时间': moment(req.user.exp * 1000).format('YYYY-MM-DD HH:mm:ss')
  };
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

/**
 *注册
 */
module.exports.register = async function (req, res) {
  let returnDate = null;
  let params = req.body;
  let user = params.userName;
  let mail = params.mail;
  let password = params.password;
  try {
    let dataArr = await db.user.findAll({
      where: {
        $or: [{ user }, { mail }]
      }
    });

    if (dataArr.length) {
      // 已经注册过了
      for (let item of dataArr) {
        if (item.user === user) {
          returnDate = '此用户名已经被注册了';
          break;
        }
        if (item.mail === mail) {
          returnDate = '此邮箱已经被注册了';
          break;
        }
      }
    } else {
      let data = await db.user.create({
        user,
        mail,
        password
      });
      if (data.user === user) {
        // 调用当前模块的登陆功能登陆
        req.body = {
          userName: user,
          mail,
          password
        };
        returnDate = this.login(req, res);
      } else {
        console.log('插入数据失败>>>', user,
          mail,
          password);
        throw new Error('插入数据失败,请联系管理员');
      }
    }
    // console.log(data);
  } catch (err) {
    res.status(500);
    returnDate = err.message;
  }
  return returnDate;
};
/**
 * 登陆
 */
module.exports.login = async function (req, res) {
  let returnDate = null;
  // 帐号或邮箱登陆
  let dataArr = await db.user.findAll({
    where: {
      $or: [{
        user: req.body.userName
      }, {
        mail: req.body.userName
      }],
      password: req.body.password
    }
  });
  if (dataArr.length) {
    let token = null;
    let toKenToData = null;
    if (dataArr[0].token) {
      // 有token 下面判断是否有效
      token = dataArr[0].token;
      toKenToData = globa.tool.toKenToData(token);
      // token 无效
      if (!toKenToData) {
        console.log('登陆>>token 无效');
        token = null;
      }
    }
    // 如果没有token或者token无效则创建一个
    if (!token) {
      console.log('登陆>>创建token');
      token = globa.tool.createToken({
        userName: req.body.userName,
        password: req.body.password
      }, req);
      dataArr[0].token = token;
      await dataArr[0].save();
      toKenToData = globa.tool.toKenToData(token);
    } else {
      console.log('登陆>>token 有效');
    }
    returnDate = {
      token,
      exp: toKenToData.exp // token 过期时间,前端判断快过期时主动刷新token
    };
  } else {
    returnDate = '帐号或密码错误';
  }
  return returnDate;
};
/**
 * 刷新token
 */
module.exports.retoken = async function (req, res) {
  let returnDate = null;
  const oldToken = req.query.access_token || req.headers.access_token;
  if (oldToken) {
    let toKenToData = req.user;
    // 重新生成新token
    let newtoken = globa.tool.createToken({
      userName: toKenToData.userName,
      password: toKenToData.password
    }, req);
      // res.append('Set-Cookie', 'access_token=' + newtoken + '; path=/');
    toKenToData = globa.tool.toKenToData(newtoken);
    let dataArr = await db.user.findAll({
      where: {
        $or: [{
          user: toKenToData.userName
        }, {
          mail: toKenToData.userName
        }],
        password: toKenToData.password
      }
    });
    // 防止二次获取token,前端刷新token时记得拦截所有请求.刷新后之前的token无效
    // 如果2个客户端登陆会出现2个有效token的情况.以第一个刷新的token为准.
    // 第二个客户端的token与数据库里的不符合直接强制下线
    if (dataArr[0].token === oldToken) {
      dataArr[0].token = newtoken;
      await dataArr[0].save();
      console.log('刷新token');
      returnDate = {
        token: newtoken,
        exp: toKenToData.exp
      };
    } else {
      // 直接强制下线
      res.status(401);
      returnDate = '未登陆';
    }
  } else {
    res.status(401);
    returnDate = '未登陆';
  }
  return returnDate;
};
