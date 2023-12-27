const jwt = require("jsonwebtoken");
const { ResponseError } = require("./ResponseData");
const { Merchants, Users } = require("../database/models"); // Import your models

const Authenticated = async (req, res, next) => {
  try {
    const authToken = req.headers["authorization"];
    const token = authToken && authToken.split(" ")[1];

    if (!token) {
      return ResponseError(res, 403, "Unauthorized", "UnauthorizedToken");
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    res.locals.id = decoded.id;

    const user = await Users.findByPk(decoded.id);
    if (user) {
      res.locals.userType = "user";
      return next();
    }

    return ResponseError(res, 403, "Unauthorized", "Invalid user");
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

const AuthenticatedMerchant = async (req, res, next) => {
  try {
    const authToken = req.headers["authorization"];
    const token = authToken && authToken.split(" ")[1];

    if (!token) {
      return ResponseError(res, 403, "Unauthorized", "UnauthorizedToken");
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    res.locals.id = decoded.id;

    const merchant = await Merchants.findByPk(decoded.id);

    if (merchant) {
      res.locals.userType = "merchant";
      return next();
    }

    return ResponseError(res, 403, "Unauthorized", "Invalid user");
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

const AdminMerchantAuth = (_, res, next) => {
  try {
    const userType = res.locals.userType;

    if (userType !== "merchant") {
      return ResponseError(res, 403, "Forbidden", "AdminMerchant access only");
    }

    return next();
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

const RegularUserAuth = (_, res, next) => {
  try {
    const userType = res.locals.userType;
    if (userType !== "user") {
      return ResponseError(res, 403, "Forbidden", "Regular User access only");
    }

    return next();
  } catch (error) {
    return ResponseError(res, 500, "Internal Server Error", error.message);
  }
};

module.exports = { Authenticated, AuthenticatedMerchant, AdminMerchantAuth, RegularUserAuth };
