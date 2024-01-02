const express = require("express");
const {
  getProfile,
  updateUserProfile,
  updateUserPassword,
  updateUserImage,
} = require("../controller/UserController");
const { Authenticated, RegularUserAuth } = require("../helpers/Authorization");
const uploadMiddleware = require("../middleware/UploadMiddleware");

const router = express.Router();

router.get("/profile", Authenticated, RegularUserAuth, getProfile);
router.put("/update-profile", Authenticated, RegularUserAuth, updateUserProfile);
router.patch("/update-image", Authenticated, RegularUserAuth, uploadMiddleware, updateUserImage);
router.patch("/update-password", Authenticated, RegularUserAuth, updateUserPassword);

module.exports = router;
