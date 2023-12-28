const express = require("express");
const {
  getMerchants,
  getMerchantDetail,
  getMerchantProfile,
  updateMerchantProfile,
  updateMerchantPassword,
  deleteMerchant,
} = require("../controller/MerchantsController");
const { AuthenticatedMerchant, AdminMerchantAuth } = require("../helpers/Authorization");

const router = express.Router();

router.get("/merchant-profile", AuthenticatedMerchant, AdminMerchantAuth, getMerchantProfile);
router.get("/", getMerchants);
router.get("/:id", getMerchantDetail);
router.patch("/update-password", AuthenticatedMerchant, AdminMerchantAuth, updateMerchantPassword);
router.patch("/update-profile", AuthenticatedMerchant, AdminMerchantAuth, updateMerchantProfile);
router.delete("/delete", AuthenticatedMerchant, AdminMerchantAuth, deleteMerchant);

module.exports = router;
