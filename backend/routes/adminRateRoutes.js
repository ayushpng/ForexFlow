const express = require("express");
const router = express.Router();

const {
  getAdminRates,
  saveAdminRate,
} = require("../controllers/adminRateController");

router.get("/", getAdminRates);
router.put("/:currencyId", saveAdminRate);

module.exports = router;