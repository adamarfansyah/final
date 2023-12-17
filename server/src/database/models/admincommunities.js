"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdminCommunities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AdminCommunities.belongsTo(models.Users, { as: "userAdmin", foreignKey: "userId" });
      AdminCommunities.belongsTo(models.Communities, {
        as: "adminCommunity",
        foreignKey: "communityId",
      });
    }
  }
  AdminCommunities.init(
    {
      userId: DataTypes.INTEGER,
      communityId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AdminCommunities",
    }
  );
  return AdminCommunities;
};
