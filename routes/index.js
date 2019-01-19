
let express = require('express');
let router = express.Router();
let postFilter = require('../postFilter');
let getFilter = require('../getFilter');
// 独立请求
router.use('/api', postFilter);
router.use('/api', getFilter);
// 处理404
router.use((req, res, next) => {
  res.status(404).send('null');
});
module.exports = router;
