const { Categories } = require("../database/models");
const { ResponseError, ResponseSuccess } = require("../helpers/ResponseData");

exports.getCategories = async (_, res) => {
  try {
    const categories = await Categories.findAll({});

    if (!categories) {
      return ResponseError(res, 404, "Not Found", "Dont have categories");
    }
    return ResponseSuccess(res, 200, "Success", categories);
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};
