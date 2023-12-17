const jwt = require("jsonwebtoken");

const VerifyEmailToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_VERIFY_EMAIL);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = { VerifyEmailToken };
