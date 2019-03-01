
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    user: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  });
}
;
