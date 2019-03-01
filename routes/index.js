/**
 * 总路由(一级路由)
 */
const express = require('express');
const router = express.Router();
const postFilter = require('../filter/postFilter');
const getFilter = require('../filter/getFilter');
// 独立请求(二级路由)
router.use('/api', postFilter);
router.use('/api', getFilter);
// 处理404
router.use((req, res, next) => {
  res.status(404).send('null');
});

module.exports = router;
