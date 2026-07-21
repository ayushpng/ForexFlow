const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createTransaction,
  getTransactions,
  getReceipt,
  deleteTransaction,
} = require("../controllers/transactionController");

// Create Transaction
router.post("/", authMiddleware, createTransaction);

// Get All Transactions
router.get("/", authMiddleware, getTransactions);

// Get Receipt
router.get("/:receiptNumber", authMiddleware, getReceipt);

// Delete Transaction
router.delete("/:id", authMiddleware, deleteTransaction);

module.exports = router;