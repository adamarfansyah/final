const { Merchants, Users } = require("../database/models");
const { Op } = require("sequelize");
const { dcryptMessageBody } = require("../helpers/Encrypt");
const {
  GenerateToken,
  GenerateTokenEmail,
  GenerateResetPasswordToken,
} = require("../helpers/GenerateToken");
const { PasswordHashing, PasswordCompare } = require("../helpers/HashPassword");
const { ResponseError, ResponseSuccess } = require("../helpers/ResponseData");
const { validateRequest } = require("../helpers/ValidateRequest");
const schemas = require("../config/schemas");
const GenerateOtp = require("../helpers/GenerateOtp");
const {
  emailBodyOTP,
  emailBodyForgotPassword,
  emailBodyForgotPasswordMerchant,
} = require("../helpers/EmailMessages");
const sendEmail = require("../helpers/SendEmail");
const { VerifyEmailToken } = require("../helpers/VerifyToken");
const {
  getDataFromCache,
  incrDataInCache,
  expDataInCache,
  delDataInCache,
} = require("../helpers/RedisHelpers");

exports.verifyEmailOtpMerchant = async (req, res) => {
  try {
    const { email } = req.body;
    const existingMerchant = await Merchants.findOne({ where: { email } });

    if (existingMerchant) {
      return ResponseError(res, 400, "Failure", "Email is already in use.");
    }

    if (!existingMerchant) {
      const existingUser = await Users.findOne({ where: { email } });
      if (existingUser) {
        return ResponseError(res, 400, "Failure", "Email is already in use.");
      }
    }
    const otp = GenerateOtp();
    const data = {
      to: email,
      text: `Hey ${email}`,
      subject: "Verify Email OTP",
      htm: emailBodyOTP(email, otp),
    };
    sendEmail(data);

    const token = GenerateTokenEmail(otp, email);
    return ResponseSuccess(res, 201, "Success", { token, exp: Date.now() + 2 * 60 * 1000 });
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.validateEmailOtpMerchant = async (req, res) => {
  try {
    const { token, otp } = req.body;

    const decoded = VerifyEmailToken(token);

    if (decoded.otp !== parseInt(otp.otp)) {
      return ResponseError(res, 403, "Failed", "OTP is not match");
    }
    return ResponseSuccess(res, 200, "Success", "Success Verify Email");
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.createMerchants = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      categories,
      image: unUsedImage,
      ...formData
    } = req.body;
    const image = req.imageUrl;

    const existingUser = await Users.findOne({ where: { email } });
    const existingMerchant = await Merchants.findOne({
      where: {
        [Op.or]: [{ name }, { email }],
      },
    });

    if (existingUser || existingMerchant) {
      return ResponseError(res, 400, "Business Name or email is already in use.");
    }

    const dcryptConfirmPassword = dcryptMessageBody(confirmPassword[0]);
    const dcryptPassword = dcryptMessageBody(password[0]);

    const errorMessage = validateRequest(
      {
        name,
        email,
        image,
        password: dcryptPassword,
        confirmPassword: dcryptConfirmPassword,
        categories: parseInt(categories, 10),
        ...formData,
      },
      schemas.createMerchantSchem
    );

    if (errorMessage) {
      return ResponseError(res, 400, "Validation Error", errorMessage);
    }

    const hashedPassword = await PasswordHashing(dcryptPassword);

    const newMerchant = await Merchants.create({
      name,
      email,
      password: hashedPassword,
      image,
      ...formData,
    });

    await newMerchant.addCategories(categories);

    return ResponseSuccess(res, 200, "Success", newMerchant);
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.loginMerchant = async (req, res) => {
  try {
    const { email, password } = req.body;

    const merchant = await Merchants.findOne({ where: { email } });
    if (!merchant) {
      return ResponseError(res, 404, "Merchant Not Found", "Merchant Not Found");
    }

    const errorMessage = validateRequest(req.body, schemas.loginMerchantSchem);
    if (errorMessage) {
      return ResponseError(res, 400, "Validation Error", errorMessage);
    }

    const maxAttempts = 3;
    const attemptsExpire = 120;

    const attemptsKey = `loginAttempts:${merchant.email}`;
    const currentAttempts = await getDataFromCache(attemptsKey);

    if (currentAttempts && parseInt(currentAttempts, 10) >= maxAttempts) {
      return ResponseError(res, 400, "Please wait 2 minutes before trying again");
    }

    const decryptedPassword = dcryptMessageBody(password);
    const isPasswordValid = await PasswordCompare(decryptedPassword, merchant.password);

    if (!isPasswordValid) {
      await incrDataInCache(attemptsKey);
      await expDataInCache(attemptsKey, attemptsExpire);
      return ResponseError(res, 400, "Password is not correct");
    }

    const dataMerchant = {
      id: merchant.id,
      name: merchant.name,
      email: merchant.email,
      image: merchant.image,
      userType: "merchant",
    };

    const accessToken = GenerateToken(dataMerchant);

    await merchant.update({ accessToken });

    await delDataInCache(`loginAttemps:${merchant.email}`);

    return ResponseSuccess(res, 200, "Success", { accessToken });
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.logoutMerchant = async (_, res) => {
  try {
    const id = res.locals.id;
    const merchant = await Merchants.findByPk(id);

    if (!merchant) {
      return ResponseError(res, 404, "Not Found", "Merchant Not Found");
    }

    await merchant.update({ accessToken: null });

    return ResponseSuccess(res, 204, "Success", "Success Logout");
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { id } = res.locals;
    const { password, confirmPassword } = req.body;

    const merchant = await Merchants.findByPk(id);
    if (!merchant) {
      return ResponseError(res, 404, "Merchant Not Found");
    }
    const dcryptConfirmPassword = dcryptMessageBody(confirmPassword);
    const dcryptPassword = dcryptMessageBody(password);

    const errorMessage = validateRequest(
      { password: dcryptPassword, confirmPassword: dcryptConfirmPassword },
      schemas.updatePasswordMerchantSchem
    );

    if (errorMessage) {
      return ResponseError(res, 400, "Validation Error", errorMessage);
    }

    const hashedPassword = await PasswordHashing(dcryptPassword);

    await merchant.update({ password: hashedPassword });

    return ResponseSuccess(res, 201, "Success Update Password", "Success");
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.updateImageMerchant = async (req, res) => {
  try {
    const { id } = res.locals;
    const image = req.imageUrl;

    const merchant = await Merchants.findByPk(id);
    if (!image && !merchant) {
      return ResponseError(res, 404, "Image or Merchant not found");
    }

    const updatedImageMerchant = await merchant.update({ image });

    return ResponseSuccess(res, 201, "Success Update Image", updatedImageMerchant);
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.forgotPasswordMerchant = async (req, res) => {
  try {
    const { email } = req.body;

    const errorMessage = validateRequest(req.body, schemas.forgotPasswordSchem);

    if (errorMessage) {
      return ResponseError(res, 400, "Validation Error", errorMessage);
    }

    const merchant = await Merchants.findOne({ where: { email } });

    if (!merchant) {
      return ResponseError(res, 404, "Merchant not found");
    }

    const token = GenerateResetPasswordToken(email);

    const data = {
      to: email,
      text: `Hey ${email}`,
      subject: "Forgot Password",
      htm: emailBodyForgotPasswordMerchant(email, token),
    };

    sendEmail(data);

    await merchant.update({ resetPasswordToken: token });

    return ResponseSuccess(res, 200, "Success Forgot Password", { token });
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.updateForgotPasswordMerchant = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
    const dcryptPassword = dcryptMessageBody(password);
    const dcryptConfirmPassword = dcryptMessageBody(confirmPassword);
    const errorMessage = validateRequest(
      { password: dcryptPassword, confirmPassword: dcryptConfirmPassword },
      schemas.updateForgotPasswordSchem
    );

    if (errorMessage) {
      return ResponseError(res, 400, "Validation Error", errorMessage);
    }

    const merchant = await Merchants.findOne({ where: { resetPasswordToken: token } });

    if (!merchant) {
      return ResponseError(res, 404, "User not found");
    }

    const passwordHashed = await PasswordHashing(dcryptPassword);

    const newMerchantPassword = await merchant.update({
      password: passwordHashed,
      resetPasswordToken: null,
    });

    return ResponseSuccess(res, 201, "Success Update Password", newMerchantPassword);
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};
