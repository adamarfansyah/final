const express = require("express");

const {
  Authenticated,
  AuthenticatedMerchant,
  AdminMerchantAuth,
  RegularUserAuth,
} = require("../helpers/Authorization");
const {
  getVenueOperationalHours,
  createVenue,
  updateVenue,
  deleteVenue,
  createPayment,
  createPaymentToken,
  getVenuesByMerchantLogin,
  getPaymentsByUser,
  sendEmailAfterPayment,
  getPaymentDetailUser,
  getPaymentsByMerchant,
  getPaymentDetailMerchant,
} = require("../controller/VenueController");
const uploadMiddleware = require("../middleware/UploadMiddleware");
const { checkBooking } = require("../middleware/CheckBooking");
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
router.get("/payment-user", Authenticated, RegularUserAuth, getPaymentsByUser);
router.delete("/delete-venue/:id", AuthenticatedMerchant, AdminMerchantAuth, deleteVenue);
router.get("/operational/:id", getVenueOperationalHours);
router.get("/merchant-venue", AuthenticatedMerchant, AdminMerchantAuth, getVenuesByMerchantLogin);

router.get("/payment-merchant", AuthenticatedMerchant, AdminMerchantAuth, getPaymentsByMerchant);
router.post("/payment", Authenticated, RegularUserAuth, checkBooking, createPayment);
router.post("/payment-token", Authenticated, RegularUserAuth, checkBooking, createPaymentToken);
router.post("/send-email", Authenticated, RegularUserAuth, sendEmailAfterPayment);
router.get("/payment-user/:id", Authenticated, RegularUserAuth, getPaymentDetailUser);
router.get(
  "/payment-merchant/:id",
  AuthenticatedMerchant,
  AdminMerchantAuth,
  getPaymentDetailMerchant
);

module.exports = router;
