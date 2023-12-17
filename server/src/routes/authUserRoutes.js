const express = require("express");
const {
  registerUser,
  loginUser,
  verifyEmailOtpUser,
  validateEmailOtpUser,
  logoutUser,
  forgotPasswordUser,
  updateForgotPasswordUser,
} = require("../controller/AuthUserController");
const { Authenticated, RegularUserAuth } = require("../helpers/Authorization");
const uploadMiddleware = require("../middleware/UploadMiddleware");

const router = express.Router();

router.post("/register", uploadMiddleware, registerUser);
router.post("/login", loginUser);
router.post("/logout", Authenticated, RegularUserAuth, logoutUser);
router.post("/verify-email", verifyEmailOtpUser);
router.post("/validate-email", validateEmailOtpUser);
router.post("/forgot-password", forgotPasswordUser);
router.post("/update-forgot-password/:token", updateForgotPasswordUser);

module.exports = router;
