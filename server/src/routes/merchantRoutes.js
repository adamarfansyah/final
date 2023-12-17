const express = require("express");
const {
  getMerchants,
  getMerchantDetail,
  getMerchantProfile,
  updateMerchantProfile,
} = require("../controller/MerchantsController");
const { AuthenticatedMerchant, AdminMerchantAuth } = require("../helpers/Authorization");

const router = express.Router();

router.get("/merchant-profile", AuthenticatedMerchant, AdminMerchantAuth, getMerchantProfile);
router.get("/", getMerchants);
router.get("/:id", getMerchantDetail);

router.patch("/update-profile", AuthenticatedMerchant, AdminMerchantAuth, updateMerchantProfile);

module.exports = router;
