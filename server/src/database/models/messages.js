"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Messages.belongsTo(models.RoomChats, { as: "roomChat", foreignKey: "roomChatId" });
    }
  }
  Messages.init(
    {
      roomChatId: DataTypes.INTEGER,
      senderId: DataTypes.INTEGER,
      body: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Messages",
    }
  );
  return Messages;
};
