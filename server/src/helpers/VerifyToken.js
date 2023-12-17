const jwt = require("jsonwebtoken");

const VerifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
    return decoded;
  } catch (error) {
    console.error("Error verifying refresh token:", error);
    return null;
  }
};

const VerifyEmailToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_VERIFY_EMAIL);
    return decoded;
  } catch (error) {
    console.error("Error verifying email token:", error);
    return null;
  }
};

module.exports = { VerifyRefreshToken, VerifyEmailToken };
