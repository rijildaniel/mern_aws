/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('prdcategories', {
    CategoryId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    CategoryName: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'prdcategories'
  });
};
