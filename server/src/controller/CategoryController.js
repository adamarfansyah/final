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

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const isExistingCategory = await Categories.findOne({ where: { name } });
    if (isExistingCategory) {
      return ResponseError(res, 400, "Category has been used", "");
    }

    const errorMessage = validateRequest({ name }, schemas.registerUserSchem);
    if (errorMessage) {
      return ResponseError(res, 400, "Validation Error", errorMessage);
    }

    await Categories.create({ name });
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Categories.findByPk(id);

    if (!category) {
      return ResponseError(res, 404, "Not Found", "Category Not Found");
    }

    if (category.name !== name) {
      const existingCategory = await Categories.findOne({ where: { name } });
      if (existingCategory) {
        return ResponseError(res, 400, "Used", "Category name has been used");
      }
    }

    await category.update({ name });

    return ResponseSuccess(res, 200, "Success", "Success Update");
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Categories.findByPk(id);

    if (!category) {
      return ResponseError(res, 404, "Not Found", "Category Not found");
    }

    await category.destroy();
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};
