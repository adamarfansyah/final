"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CommunityImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CommunityImage.belongsTo(models.Communities, {
        as: "communityImage",
        foreignKey: "communityId",
      });
    }
  }
  CommunityImage.init(
    {
      communityId: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CommunityImage",
    }
  );
  return CommunityImage;
};
