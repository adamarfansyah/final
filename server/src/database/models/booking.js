"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Venues, { foreignKey: "venueId" });
      Booking.belongsTo(models.Users, { foreignKey: "userId" });
    }
  }
  Booking.init(
    {
      userId: DataTypes.INTEGER,
      venueId: DataTypes.INTEGER,
      startTime: DataTypes.STRING,
      endTime: DataTypes.STRING,
      amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
