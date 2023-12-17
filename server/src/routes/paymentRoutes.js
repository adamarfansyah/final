const express = require("express");

const {
  Authenticated,
  AuthenticatedMerchant,
  AdminMerchantAuth,
  RegularUserAuth,
} = require("../helpers/Authorization");
const {
  createPayment,
  createPaymentToken,
  sendEmailAfterPayment,
  getPaymentsByUser,
  getPaymentDetailUser,
  getPaymentsByMerchant,
  getPaymentDetailMerchant,
} = require("../controller/PaymentController");

const { checkBooking } = require("../middleware/CheckBooking");
const router = express.Router();

router.get("/payment-user", Authenticated, RegularUserAuth, getPaymentsByUser);
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
