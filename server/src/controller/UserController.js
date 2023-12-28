const { Users } = require("../database/models");
const { PasswordHashing, PasswordCompare } = require("../helpers/HashPassword");
const { ResponseError, ResponseSuccess } = require("../helpers/ResponseData");
const { validateRequest } = require("../helpers/ValidateRequest");
const schemas = require("../config/schemas");
const { dcryptMessageBody } = require("../helpers/Encrypt");

exports.getProfile = async (_, res) => {
  try {
    const { id } = res.locals;
    const user = await Users.findByPk(id, {
      attributes: {
        exclude: ["password", "accessToken", "resetPasswordToken"],
      },
    });

    if (!user) {
      return ResponseError(res, 404, "User Not Found");
    }

    return ResponseSuccess(res, 200, "Success", user);
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { id } = res.locals;
    const { username, firstName, lastName, phoneNumber } = req.body;

    const image = req.imageUrl;
    const user = await Users.findByPk(id, {
      attributes: {
        exclude: ["password", "accessToken", "resetPasswordToken"],
      },
    });

    if (!user) {
      return ResponseError(res, 404, "User Not Found");
    }

    const errorMessage = validateRequest(
      { username, firstName, lastName, phoneNumber, image },
      schemas.updateUserProfileSchem
    );

    if (errorMessage) {
      return ResponseError(res, 400, "Validation Error", errorMessage);
    }

    await user.update({ username, firstName, lastName, phoneNumber, image });

    return ResponseSuccess(res, 201, "Success Update User", user);
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.updateUserPassword = async (req, res) => {
  try {
    const { id } = res.locals;

    const { oldPassword, password, confirmPassword } = req.body;

    const dcryptedOldPassword = dcryptMessageBody(oldPassword);
    const dcryptedPassword = dcryptMessageBody(password);
    const dcryptedConfirmPassword = dcryptMessageBody(confirmPassword);
    const user = await Users.findByPk(id);
    if (!user) {
      return ResponseError(res, 404, "User Not Found");
    }

    const errorMessage = validateRequest(
      {
        oldPassword: dcryptedOldPassword,
        password: dcryptedPassword,
        confirmPassword: dcryptedConfirmPassword,
      },
      schemas.updateUserPasswordSchem
    );

    if (errorMessage) {
      return ResponseError(res, 400, "Validation Error", errorMessage);
    }

    const comparePassword = await PasswordCompare(dcryptedOldPassword, user.password);

    if (!comparePassword) {
      return ResponseError(res, 403, "Old Password is not correct");
    }

    const hashedPassword = await PasswordHashing(dcryptedPassword);

    await user.update({ password: hashedPassword });
    return ResponseSuccess(res, 201, "Success Update Password User");
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};
