"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Venues extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Venues.hasMany(models.Payment, { as: "BookedVenue", foreignKey: "venueId" });
      Venues.belongsTo(models.Merchants, { as: "MerchantVenue", foreignKey: "merchantId" });
    }
  }
  Venues.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      merchantId: DataTypes.INTEGER,
      startHour: DataTypes.INTEGER,
      endHour: DataTypes.INTEGER,
      image: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Venues",
    }
  );
  return Venues;
};
