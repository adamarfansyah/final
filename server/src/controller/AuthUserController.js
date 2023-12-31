const { Users, Merchants } = require("../database/models");
const {
  GenerateToken,
  GenerateTokenEmail,
  GenerateResetPasswordToken,
  GenerateTokenEmailNoExp,
} = require("../helpers/GenerateToken");
const { PasswordHashing, PasswordCompare } = require("../helpers/HashPassword");
const { ResponseError, ResponseSuccess } = require("../helpers/ResponseData");
const { Op } = require("sequelize");
const { VerifyEmailToken } = require("../helpers/VerifyToken");
const { validateRequest } = require("../helpers/ValidateRequest");
const schemas = require("../config/schemas");
const { dcryptMessageBody } = require("../helpers/Encrypt");
const sendEmail = require("../helpers/SendEmail");
const { emailBodyOTP, emailBodyForgotPasswordUser } = require("../helpers/EmailMessages");
const GenerateOtp = require("../helpers/GenerateOtp");
const {
  expDataInCache,
  incrDataInCache,
  delDataInCache,
  getDataFromCache,
} = require("../helpers/RedisHelpers");

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

    const decoded = VerifyEmailToken(token.token);

    if (decoded.otp !== parseInt(otp.otp)) {
      return ResponseError(res, 403, "Failed", "OTP is not match");
    }

    if (decoded === "jwt expired") {
      return ResponseError(res, 404, "Failed", decoded);
    }

    const tokenStepCreateUser = GenerateTokenEmailNoExp(decoded?.email);

    return ResponseSuccess(res, 200, "Success", {
      message: "Success Verify Email",
      token: tokenStepCreateUser,
      exp: 0,
    });
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, token, ...formData } = req.body;
    const image = "https://i.ibb.co/1Z7Z60B/icons8-user-96.png";
    const decoded = VerifyEmailToken(token);

    if (decoded.email !== email) {
      return ResponseError(res, 400, "Token is failure");
    }

    const existingUser = await Users.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return ResponseError(res, 400, "Username or email is already in use.");
    }

    const dcryptPassword = dcryptMessageBody(password);
    const dcryptConfirmPassword = dcryptMessageBody(confirmPassword);

    const errorMessage = validateRequest(
      {
        username,
        email,
        password: dcryptPassword,
        confirmPassword: dcryptConfirmPassword,
        image,
        token,
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

    const errorMessage = validateRequest(req.body, schemas.loginUserSchem);
    if (errorMessage) {
      return ResponseError(res, 400, "Validation Error", errorMessage);
    }

    const maxAttempts = 3;
    const attemptsExpire = 120;

    const attemptsKey = `loginAttempts:${user.email}`;
    const currentAttempts = await getDataFromCache(attemptsKey);

    if (currentAttempts && parseInt(currentAttempts, 10) >= maxAttempts) {
      return ResponseError(res, 400, "Please wait 2 minutes before trying again");
    }

    const decryptedPassword = dcryptMessageBody(password);
    const isPasswordValid = await PasswordCompare(decryptedPassword, user.password);

    if (!isPasswordValid) {
      await incrDataInCache(attemptsKey);
      await expDataInCache(attemptsKey, attemptsExpire);
      return ResponseError(res, 400, "Password is not correct");
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

    await delDataInCache(`loginAttemps:${user.email}`);

    return ResponseSuccess(res, 200, "Success", { accessToken });
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.logoutUser = async (_, res) => {
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

    const errorMessage = validateRequest(req.body, schemas.forgotPasswordSchem);

    if (errorMessage) {
      return ResponseError(res, 400, "Validation Error", errorMessage);
    }

    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return ResponseError(res, 404, "User not found");
    }

    const token = GenerateResetPasswordToken(email);

    const data = {
      to: email,
      text: `Hey ${email}`,
      subject: "Forgot Password",
      htm: emailBodyForgotPasswordUser(email, token),
    };

    sendEmail(data);

    await user.update({ resetPasswordToken: token });

    return ResponseSuccess(res, 200, "Success Forgot Password", { token });
  } catch (error) {
    console.log({ error });
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

exports.updateForgotPasswordUser = async (req, res) => {
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

    const user = await Users.findOne({ where: { resetPasswordToken: token } });

    if (!user) {
      return ResponseError(res, 404, "User not found");
    }

    const passwordHashed = await PasswordHashing(dcryptPassword);
    const newUserPassword = await user.update({
      password: passwordHashed,
      resetPasswordToken: null,
    });

    return ResponseSuccess(res, 201, "Success Update Password", newUserPassword);
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};
