const { Router } = require("express");
const authUserRoute = require("../routes/authUserRoutes");
const authMerchantRoute = require("../routes/authMerchantRoutes");
const merchantRoute = require("../routes/merchantRoutes");
const categoryRoute = require("../routes/categoryRoutes");
const venuesRoute = require("../routes/venueRoutes");
const userRoute = require("../routes/userRoutes");

const router = Router();

router.use("/auth", authUserRoute);
router.use("/auth-merchant", authMerchantRoute);
router.use("/merchant", merchantRoute);
router.use("/category", categoryRoute);
router.use("/venue", venuesRoute);
router.use("/user", userRoute);

module.exports = router;
