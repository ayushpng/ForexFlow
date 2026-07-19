const express = require("express");
const router = express.Router();

const {
  searchRates,
  getAllShops,
  getShopDetails,
} = require("../controllers/customerController");

// Search best exchange rates
router.get("/search", searchRates);
router.get("/shops", getAllShops);
router.get("/shop/:id", getShopDetails);
module.exports = router;
