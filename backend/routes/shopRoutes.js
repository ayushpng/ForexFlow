const express = require("express");
const router = express.Router();

const {
  getShopRates,
  saveShopRate,
} = require("../controllers/shopController");

router.get("/rates", getShopRates);

router.put("/rates/:currencyId", saveShopRate);

module.exports = router;