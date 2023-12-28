const express = require("express");

const { AuthenticatedMerchant, AdminMerchantAuth } = require("../helpers/Authorization");
const {
  getVenueOperationalHours,
  createVenue,
  updateVenue,
  deleteVenue,
  getVenuesByMerchantLogin,
} = require("../controller/VenueController");
const uploadMiddleware = require("../middleware/UploadMiddleware");
const router = express.Router();

router.post(
  "/create-venue",
  AuthenticatedMerchant,
  AdminMerchantAuth,
  uploadMiddleware,
  createVenue
);
router.put(
  "/update-venue/:id",
  AuthenticatedMerchant,
  AdminMerchantAuth,
  uploadMiddleware,
  updateVenue
);
router.delete("/delete-venue/:id", AuthenticatedMerchant, AdminMerchantAuth, deleteVenue);
router.get("/operational/:id", getVenueOperationalHours);
router.get("/merchant-venue", AuthenticatedMerchant, AdminMerchantAuth, getVenuesByMerchantLogin);

module.exports = router;
