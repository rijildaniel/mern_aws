/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userorders', {
    OrderId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    Email: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    ItemName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    Price: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'userorders'
  });
};
