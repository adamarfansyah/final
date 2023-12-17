const express = require("express");
const {
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controller/CategoryController");

const router = express.Router();

router.get("/", getCategories);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
