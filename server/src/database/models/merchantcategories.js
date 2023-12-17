"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MerchantCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MerchantCategories.belongsTo(models.Merchants, {
        as: "merchant",
        foreignKey: "merchantId",
      });
      MerchantCategories.belongsTo(models.Categories, {
        as: "category",
        foreignKey: "categoryId",
      });
    }
  }
  MerchantCategories.init(
    {
      merchantId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MerchantCategories",
    }
  );
  return MerchantCategories;
};
