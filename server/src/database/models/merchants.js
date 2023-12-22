"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Merchants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Merchants.belongsToMany(models.Categories, {
        through: "MerchantCategories",
        as: "categories",
        foreignKey: "merchantId",
      });
      Merchants.hasMany(models.Payment, { as: "merchantBook", foreignKey: "merchantId" });
      Merchants.hasMany(models.Venues, { as: "MerchantVenue", foreignKey: "merchantId" });
    }
  }
  Merchants.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      city: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      latitude: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE,
      image: DataTypes.STRING,
      closeDate: DataTypes.STRING,
      accessToken: DataTypes.STRING,
      resetPasswordToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Merchants",
    }
  );
  return Merchants;
};
