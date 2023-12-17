"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Communities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Communities.belongsTo(models.AdminCommunities, {
        as: "adminCommunity",
        foreignKey: "adminCommunityId",
      });
      Communities.hasMany(models.CommunityImage, {
        as: "communityImages",
        foreignKey: "communityId",
      });
      Communities.hasMany(models.RoomChats, {
        as: "communityRoomChat",
        foreignKey: "communityId",
      });
    }
  }
  Communities.init(
    {
      adminCommunityId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      province: DataTypes.STRING,
      city: DataTypes.STRING,
      address: DataTypes.STRING,
      description: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Communities",
    }
  );
  return Communities;
};
