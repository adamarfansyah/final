"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoomChats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoomChats.hasMany(models.Messages, { as: "roomChat", foreignKey: "roomChatId" });
      RoomChats.belongsTo(models.Communities, { as: "roomCommunities", foreignKey: "communityId" });
      RoomChats.belongsTo(models.AdminCommunities, { as: "adminRoom", foreignKey: "adminRoomId" });
    }
  }
  RoomChats.init(
    {
      name: DataTypes.STRING,
      communityId: DataTypes.INTEGER,
      adminRoomId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "RoomChats",
    }
  );
  return RoomChats;
};
