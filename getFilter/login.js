module.exports = function (req, res, next) {
//   res.send(req.path);
  console.log(req.ip);
  res.json(req.ip);
};
