const express = require("express");

const { AuthenticatedMerchant, AdminMerchantAuth } = require("../helpers/Authorization");
const {
  getVenueOperationalHours,
  createVenue,
  updateVenue,
  deleteVenue,
  getVenuesByMerchantLogin,
  getVenueOperationalHoursByMerchant,
  updateVenueImage,
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
router.put("/update-venue/:id", AuthenticatedMerchant, AdminMerchantAuth, updateVenue);
router.patch(
  "/update-venue-image/:id",
  AuthenticatedMerchant,
  AdminMerchantAuth,
  uploadMiddleware,
  updateVenueImage
);
router.delete("/delete-venue/:id", AuthenticatedMerchant, AdminMerchantAuth, deleteVenue);
router.get("/operational/:id", getVenueOperationalHours);
router.get(
  "/venue/:id",
  AuthenticatedMerchant,
  AdminMerchantAuth,
  getVenueOperationalHoursByMerchant
);
router.get("/merchant-venue", AuthenticatedMerchant, AdminMerchantAuth, getVenuesByMerchantLogin);

module.exports = router;
