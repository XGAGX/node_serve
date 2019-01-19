/**
 * 总路由(一级路由)
 */
let express = require('express');
let router = express.Router();
let postFilter = require('../filter/postFilter');
let getFilter = require('../filter/getFilter');
// 独立请求(二级路由)
router.use('/api', postFilter);
router.use('/api', getFilter);
// 处理404
router.use((req, res, next) => {
  res.status(404).send('null');
});
module.exports = router;
