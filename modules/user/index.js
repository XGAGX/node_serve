
// 单个模块主文件
// 配置模块的路由使用
// const express = require('express');
// const router = express.Router();
const Router = require('koa-router');
const router = new Router();
const sever = require('./serve');
const globa = require('../../globa');
// 验证模块
const auth = require('../../globa/auth');
// const multer = require('multer');
// 上传文件路径临时储存位置设置
// const upload = multer();

// 本模块的子路由(往下添加即可)
router.post('/showlogin', auth, toMod(sever, 'showlogin'));
router.post('/upload', toMod(sever, 'upload'));

// 登陆
router.post('/login', toMod(sever, 'login'));
// 注册帐号
router.post('/register', toMod(sever, 'register'));
// 刷新token
router.post('/retoken', auth, toMod(sever, 'retoken'));
// ===================================================
// ===================================================

/**
 *运行对应的模块,并且返回数据
 *
 * @param {*} sever
 * @param {*} modName
 * @returns
 */
function toMod (sever, modName) {
  return async (ctx, next) => {
    const res = ctx.response;
    const req = ctx.request;
    if (sever[modName]) {
      try {
        res.status = 200; // 匹配上路由了
        let data = await sever[modName](req, res); // 运行对应的模块,获取返回数据
        res.body = globa.setReturnObj(data);
      } catch (err) {
        console.log('模块运行出错>>', '模块名称:' + modName, '路径:' + req.path, '错误信息:' + err.message);
        res.status = 500;
        res.body = globa.setReturnObj(null, 500, '模块运行出错');
      }
    } else {
      res.status = 500;
      res.body = globa.setReturnObj(null, 500, '模块运行出错');
    }
  };
}

module.exports = router;
