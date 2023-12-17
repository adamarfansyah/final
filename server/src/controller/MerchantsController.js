const schemas = require("../config/schemas");
const { Merchants, Venues, Categories } = require("../database/models");
const { dcryptMessageBody } = require("../helpers/Encrypt");
const { PasswordHashing } = require("../helpers/HashPassword");
const { ResponseError, ResponseSuccess } = require("../helpers/ResponseData");
const { validateRequest } = require("../helpers/ValidateRequest");

exports.getMerchants = async (_, res) => {
  try {
    const merchants = await Merchants.findAll({
      attributes: {
        exclude: ["password", "accessToken", "resetPasswordToken"],
      },
      include: [
        {
          model: Categories,
          as: "categories",
        },
      ],
    });

    return ResponseSuccess(res, 200, "Success", merchants);
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.getMerchantDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const merchant = await Merchants.findByPk(id, {
      attributes: {
        exclude: ["password", "accessToken", "resetPasswordToken"],
      },
      include: [
        {
          model: Categories,
          as: "categories",
        },
        {
          model: Venues,
          as: "MerchantVenue",
        },
      ],
    });

    if (!merchant) {
      return ResponseError(res, 404, "Not Found", "Merchant Not Found");
    }

    return ResponseSuccess(res, 200, "Success", merchant);
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.getMerchantProfile = async (req, res) => {
  try {
    const { id } = res.locals;

    const merchant = await Merchants.findByPk(id, {
      attributes: {
        exclude: ["accessToken", "resetPasswordToken"],
      },
      include: [
        {
          model: Categories,
          as: "categories",
        },
      ],
    });

    if (!merchant) {
      return ResponseError(res, 404, "Not Found", " not found");
    }

    return ResponseSuccess(res, 200, "Success", merchant);
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.updateMerchantProfile = async (req, res) => {
  try {
    const { id } = res.locals;
    const { ...formData } = req.body;

    const merchant = await Merchants.findByPk(id);
    if (!merchant) {
      return ResponseError(res, 404, "Not Found", " not found");
    }

    await merchant.update(formData);
    return ResponseSuccess(res, 201, "Success Update Data", "Success Update Data");
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.updateMerchantPassword = async (req, res) => {
  try {
    const { id } = res.locals;
    const { password } = req.body;
    const merchant = await Merchants.findByPk(id);
    if (!merchant) {
      return ResponseError(res, 404, "Merchant Not Found");
    }

    const errorMessage = validateRequest(req.body, schemas.updatePasswordMerchantSchem);
    if (errorMessage) {
      return ResponseError(res, 400, "Validation Error", errorMessage);
    }

    const dcryptPassword = dcryptMessageBody(password);
    const hashedPassword = await PasswordHashing(dcryptPassword);

    await merchant.update({ password: hashedPassword });

    return ResponseSuccess(res, 201, "Update Success", "Update Success");
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.deleteMerchant = async (req, res) => {
  try {
    const { id } = res.locals;
    const merchant = await Merchants.findByPk(id);
    if (!merchant) {
      return ResponseError(res, 404, "Merchant Not Found");
    }

    await merchant.destroy();

    return ResponseSuccess(res, 204, "Success Delete");
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};
