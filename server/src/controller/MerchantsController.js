const schemas = require("../config/schemas");
const { Merchants, Venues, Categories } = require("../database/models");
const { dcryptMessageBody } = require("../helpers/Encrypt");
const { PasswordHashing, PasswordCompare } = require("../helpers/HashPassword");
const { getDataFromCache, setDataInCache, delDataInCache } = require("../helpers/RedisHelpers");
const { ResponseError, ResponseSuccess } = require("../helpers/ResponseData");
const { validateRequest } = require("../helpers/ValidateRequest");

exports.getMerchants = async (_, res) => {
  try {
    const merchantsCache = await getDataFromCache("merchants");
    if (merchantsCache) {
      return ResponseSuccess(res, 200, "Success", merchantsCache);
    }

    const merchants = await Merchants.findAll({
      where: {
        status: false,
      },
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

    await setDataInCache("merchants", merchants);

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
          where: {
            status: false,
          },
        },
      ],
    });

    if (!merchant || merchant.status) {
      return ResponseError(res, 404, "Not Found", "Merchant Not Found");
    }

    return ResponseSuccess(res, 200, "Success", merchant);
  } catch (error) {
    console.log({ error });
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.getMerchantProfile = async (_, res) => {
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
    await delDataInCache("merchants");

    return ResponseSuccess(res, 201, "Success Update Data", "Success Update Data");
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.updateMerchantPassword = async (req, res) => {
  try {
    const { id } = res.locals;
    const { oldPassword, password, confirmPassword } = req.body;
    const merchant = await Merchants.findByPk(id);

    if (!merchant) {
      return ResponseError(res, 404, "Merchant Not Found");
    }

    const dcryptedOldPassword = dcryptMessageBody(oldPassword);
    const dcryptPassword = dcryptMessageBody(password);
    const dcryptConfirmPassword = dcryptMessageBody(confirmPassword);
    const errorMessage = validateRequest(
      {
        oldPassword: dcryptedOldPassword,
        password: dcryptPassword,
        confirmPassword: dcryptConfirmPassword,
      },
      schemas.updatePasswordMerchantSchem
    );

    const comparePassword = await PasswordCompare(dcryptedOldPassword, merchant.password);

    if (!comparePassword) {
      return ResponseError(res, 403, "Old Password is not correct");
    }

    if (errorMessage) {
      return ResponseError(res, 400, "Validation Error", errorMessage);
    }

    const hashedPassword = await PasswordHashing(dcryptPassword);
    await merchant.update({ password: hashedPassword });
    await delDataInCache("merchants");
    return ResponseSuccess(res, 201, "Update Success", "Update Success");
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.deleteMerchant = async (_, res) => {
  try {
    const { id } = res.locals;
    const merchant = await Merchants.findByPk(id);

    if (!merchant || merchant.status) {
      return ResponseError(res, 404, "Merchant Not Found");
    }

    await merchant.update({ status: true });
    await delDataInCache("merchants");

    return ResponseSuccess(res, 204, "Success Delete");
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};
