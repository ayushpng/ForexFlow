const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getShopRates,
  saveShopRate,
  getProfile,
} = require("../controllers/shopController");

router.get("/rates", authMiddleware, getShopRates);
router.put("/rates/:currencyId", authMiddleware, saveShopRate);
router.get("/profile", authMiddleware, getProfile);
module.exports = router;