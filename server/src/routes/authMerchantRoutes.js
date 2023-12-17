const express = require("express");
const {
  createMerchants,
  loginMerchant,
  logoutMerchant,
  verifyEmailOtpMerchant,
  validateEmailOtpMerchant,
} = require("../controller/AuthMerchantController");
const { AuthenticatedMerchant, AdminMerchantAuth } = require("../helpers/Authorization");
const uploadMiddleware = require("../middleware/UploadMiddleware");

const router = express.Router();

router.post("/register", uploadMiddleware, createMerchants);
router.post("/login", loginMerchant);
router.post("/logout", AuthenticatedMerchant, AdminMerchantAuth, logoutMerchant);
router.post("/verify-email", verifyEmailOtpMerchant);
router.post("/validate-email", validateEmailOtpMerchant);

module.exports = router;
