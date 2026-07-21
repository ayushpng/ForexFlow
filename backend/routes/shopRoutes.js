const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getShopRates,
  saveShopRate,
} = require("../controllers/shopController");

router.get("/rates", authMiddleware, getShopRates);
router.put("/rates/:currencyId", authMiddleware, saveShopRate);

module.exports = router;