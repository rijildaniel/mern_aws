/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    OrderId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    Email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      references: {
        model: 'registerusers',
        key: 'Email'
      }
    },
    CategoryId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'prdcategories',
        key: 'CategoryId'
      }
    },
    ItemId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'items',
        key: 'ItemId'
      }
    }
  }, {
    tableName: 'orders'
  });
};
