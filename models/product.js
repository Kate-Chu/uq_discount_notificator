'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Product.init({
    name: DataTypes.STRING,
    uniqloId: DataTypes.INTEGER,
    category: DataTypes.STRING,
    url: DataTypes.STRING,
    img: DataTypes.STRING,
    originalPrice: DataTypes.INTEGER,
    currentPrice: DataTypes.INTEGER,
    soldOut: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    underscored: true
  })
  return Product
}
