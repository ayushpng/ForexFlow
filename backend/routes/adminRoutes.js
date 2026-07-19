const express = require("express");
const router = express.Router();

const {
  getPendingShops,
  approveShop,
  rejectShop,
} = require("../controllers/adminController");

const {
  getAdminRates,
  saveAdminRate,
} = require("../controllers/adminRateController");

// Shop Management
router.get("/pending-shops", getPendingShops);
router.put("/approve/:id", approveShop);
router.put("/reject/:id", rejectShop);

// Exchange Rates
router.get("/rates", getAdminRates);
router.put("/rates/:currencyId", saveAdminRate);

module.exports = router;
