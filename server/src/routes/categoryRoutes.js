const express = require("express");
const { getCategories } = require("../controller/CategoryController");

const router = express.Router();

router.get("/", getCategories);

module.exports = router;
