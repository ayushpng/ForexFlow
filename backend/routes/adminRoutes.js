const express = require("express");
const router = express.Router();

// controllers (we will create next)
const {
  getPendingShops,
  approveShop,
  rejectShop,
} = require("../controllers/adminController");

// GET all pending shopkeepers
router.get("/pending-shops", getPendingShops);

// Approve shopkeeper
router.put("/approve/:id", approveShop);

// Reject shopkeeper
router.put("/reject/:id", rejectShop);

module.exports = router;