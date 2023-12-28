const express = require("express");
const {
  createMerchants,
  loginMerchant,
  logoutMerchant,
  verifyEmailOtpMerchant,
  validateEmailOtpMerchant,
  forgotPasswordMerchant,
  updateForgotPasswordMerchant,
} = require("../controller/AuthMerchantController");
const { AuthenticatedMerchant, AdminMerchantAuth } = require("../helpers/Authorization");
const uploadMiddleware = require("../middleware/UploadMiddleware");

const router = express.Router();

router.post("/login", loginMerchant);
router.post("/register", uploadMiddleware, createMerchants);
router.post("/logout", AuthenticatedMerchant, AdminMerchantAuth, logoutMerchant);
router.post("/verify-email", verifyEmailOtpMerchant);
router.post("/validate-email", validateEmailOtpMerchant);
router.post("/forgot-password", forgotPasswordMerchant);
router.post("/update-forgot-password/:token", updateForgotPasswordMerchant);

module.exports = router;
