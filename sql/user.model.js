
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    user: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    mail: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING,
      value: 0
    },
    token: {
      type: DataTypes.STRING

    }
  });
}
;
