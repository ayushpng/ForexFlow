const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createTransaction,
} = require("../controllers/transactionController");

router.post("/", authMiddleware, createTransaction);

module.exports = router;