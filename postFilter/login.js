
module.exports = async function (req, returnData) {
//   res.send(req.path);
  console.log(req.path);
  //
  // res.json(req.ip);
  return { path: req.path, query: req.query, params: req.params };
};
