const express = require("express");
const {
  getProfile,
  updateUserProfile,
  updateUserPassword,
} = require("../controller/UserController");
const { Authenticated, RegularUserAuth } = require("../helpers/Authorization");
const uploadMiddleware = require("../middleware/UploadMiddleware");

const router = express.Router();

router.get("/profile", Authenticated, RegularUserAuth, getProfile);
router.put("/update-profile", Authenticated, RegularUserAuth, uploadMiddleware, updateUserProfile);
router.patch("/update-password", Authenticated, RegularUserAuth, updateUserPassword);

module.exports = router;
