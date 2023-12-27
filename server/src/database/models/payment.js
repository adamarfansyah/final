"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.Users, { as: "userBook", foreignKey: "userId" });
      Payment.belongsTo(models.Venues, { as: "BookedVenue", foreignKey: "venueId" });
      Payment.belongsTo(models.Merchants, { as: "merchantBook", foreignKey: "merchantId" });
    }
  }
  Payment.init(
    {
      userId: DataTypes.INTEGER,
      merchantId: DataTypes.INTEGER,
      venueId: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      orderId: DataTypes.STRING,
      transactionId: DataTypes.STRING,
      transactionTime: DataTypes.STRING,
      paymentType: DataTypes.STRING,
      startBook: DataTypes.STRING,
      endBook: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
