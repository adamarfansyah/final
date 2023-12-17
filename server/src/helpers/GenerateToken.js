const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const GenerateToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_TOKEN);

  return token;
};

const GenerateRefreshToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: "1d",
  });

  return token;
};

const GenerateTokenEmail = (otp, email) => {
  if (!otp || !email) {
    return;
  }
  return jwt.sign({ otp, email }, process.env.JWT_VERIFY_EMAIL, { expiresIn: "2m" });
};

const GenerateResetPasswordToken = (email) => {
  const token = CryptoJS.SHA256(email, process.env.TOKEN_FORGOT_PASSWORD_CRYPTO).toString();
  return token;
};

module.exports = {
  GenerateToken,
  GenerateRefreshToken,
  GenerateTokenEmail,
  GenerateResetPasswordToken,
};
