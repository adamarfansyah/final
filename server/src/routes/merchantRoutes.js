const express = require("express");
const {
  getMerchants,
  getMerchantDetail,
  getMerchantProfile,
  updateMerchantProfile,
  updateMerchantPassword,
  deleteMerchant,
  updateMerchantImage,
} = require("../controller/MerchantsController");
const { AuthenticatedMerchant, AdminMerchantAuth } = require("../helpers/Authorization");
const uploadMiddleware = require("../middleware/UploadMiddleware");

const router = express.Router();

router.get("/merchant-profile", AuthenticatedMerchant, AdminMerchantAuth, getMerchantProfile);
router.get("/", getMerchants);
router.get("/:id", getMerchantDetail);
router.patch("/update-password", AuthenticatedMerchant, AdminMerchantAuth, updateMerchantPassword);
router.patch("/update-profile", AuthenticatedMerchant, AdminMerchantAuth, updateMerchantProfile);
router.patch(
  "/update-image",
  AuthenticatedMerchant,
  AdminMerchantAuth,
  uploadMiddleware,
  updateMerchantImage
);
router.delete("/delete", AuthenticatedMerchant, AdminMerchantAuth, deleteMerchant);

module.exports = router;
