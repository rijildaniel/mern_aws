/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('items', {
    ItemId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    CategoryId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'prdcategories',
        key: 'CategoryId'
      }
    },
    ItemName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Price: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'items'
  });
};
