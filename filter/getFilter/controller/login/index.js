const db = require('../../../../sql');
module.exports = async function (user) {
  //   res.send(req.path);
  console.log('login>', user.ip);
  // 添加向user表里添加一条记录
  db.user.create({
    user: 'gaox',
    password: 'xxx'
  });
  return user;
};
