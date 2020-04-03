/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('registerusers', {
    Email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    Password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    PhoneNo: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    Address: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    tableName: 'registerusers'
  });
};
