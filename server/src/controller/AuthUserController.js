const { Users, Merchants } = require("../database/models");
const {
  GenerateToken,
  GenerateRefreshToken,
  GenerateTokenEmail,
  GenerateResetPasswordToken,
} = require("../helpers/GenerateToken");
const { PasswordHashing, PasswordCompare } = require("../helpers/HashPassword");
const { ResponseError, ResponseSuccess } = require("../helpers/ResponseData");
const { Op } = require("sequelize");
const { VerifyRefreshToken, VerifyEmailToken } = require("../helpers/VerifyToken");
const { validateRequest } = require("../helpers/ValidateRequest");
const schemas = require("../config/schemas");
const { dcryptMessageBody } = require("../helpers/Encrypt");
const sendEmail = require("../helpers/SendEmail");
const { emailBodyOTP, emailBodyForgotPassword } = require("../helpers/EmailMessages");
const GenerateOtp = require("../helpers/GenerateOtp");

exports.verifyEmailOtpUser = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await Users.findOne({ where: { email } });

    if (existingUser) {
      return ResponseError(res, 400, "Email is already in use.");
    }

    if (!existingUser) {
      const existingMerchant = await Merchants.findOne({ where: { email } });
      if (existingMerchant) {
        return ResponseError(res, 400, "Email is already in use.");
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

exports.validateEmailOtpUser = async (req, res) => {
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

exports.registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      confirmPassword,
      image: unUsedImage,
      ...formData
    } = req.body;
    const image = req.imageUrl;

    const existingUser = await Users.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return ResponseError(res, 400, "Username or email is already in use.");
    }

    const dcryptPassword = dcryptMessageBody(password[0]);
    const dcryptConfirmPassword = dcryptMessageBody(confirmPassword[0]);

    const errorMessage = validateRequest(
      {
        username,
        email,
        password: dcryptPassword,
        confirmPassword: dcryptConfirmPassword,
        image,
        ...formData,
      },
      schemas.registerUserSchem
    );

    if (errorMessage) {
      return ResponseError(res, 400, "Validation Error", errorMessage);
    }

    const hashedPassword = await PasswordHashing(dcryptPassword);

    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
      image,
      ...formData,
    });

    return ResponseSuccess(res, 200, "Success", newUser);
  } catch (error) {
    console.log(error);
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return ResponseError(res, 404, "Email Not Found");
    }

    const dcryptPassword = dcryptMessageBody(password);

    const errorMessage = validateRequest(req.body, schemas.loginUserSchem);

    if (errorMessage) {
      return ResponseError(res, 400, "Validation Error", errorMessage);
    }

    const comparedPassword = await PasswordCompare(dcryptPassword, user.password);

    if (!comparedPassword) {
      return ResponseError(res, 400, "Password is not same");
    }

    const dataUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      userType: "user",
    };

    const accessToken = GenerateToken(dataUser);

    await user.update({ accessToken });

    return ResponseSuccess(res, 200, "Success", { accessToken });
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.logoutUser = async (req, res) => {
  try {
    const { id } = res.locals;
    const user = await Users.findByPk(id);

    if (!user) {
      return ResponseError(res, 404, "Not Found", "User Not Found");
    }

    await user.update({ accessToken: null });

    return ResponseSuccess(res, 204, "Success", "Success Logout");
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.forgotPasswordUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return ResponseError(res, 404, "User not found");
    }

    const errorMessage = validateRequest(req.body, schemas.forgotPasswordSchem);

    if (errorMessage) {
      return ResponseError(res, 400, "Validation Error", errorMessage);
    }

    const token = GenerateResetPasswordToken(email);

    const data = {
      to: email,
      text: `Hey ${email}`,
      subject: "Forgot Password",
      htm: emailBodyForgotPassword(email, token),
    };

    sendEmail(data);

    await user.update({ resetPasswordToken: token });

    return ResponseSuccess(res, 200, "Success Forgot Password", { token });
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.updateForgotPasswordUser = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await Users.findOne({ where: { resetPasswordToken: token } });

    if (!user) {
      return ResponseError(res, 404, "User not found");
    }

    const errorMessage = validateRequest(req.body, schemas.updateForgotPasswordSchem);

    if (errorMessage) {
      return ResponseError(res, 400, "Validation Error", errorMessage);
    }

    const passwordHashed = await PasswordHashing(password);

    const newUserPassword = await user.update({
      password: passwordHashed,
      resetPasswordToken: null,
    });

    return ResponseSuccess(res, 201, "Success Update Password", newUserPassword);
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};
