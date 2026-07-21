const db = require("../config/db");

// =====================================
// Complete Currency Exchange
// =====================================
const createTransaction = (req, res) => {
  const shopId = req.user.id;

  const {
    customer_name,
    customer_email,
    customer_phone,
    country,
    passport_number,
    transaction_type,
    currency_id,
    amount,
  } = req.body;

  // Validate required fields
  if (
    !customer_name ||
    !country ||
    !passport_number ||
    !transaction_type ||
    !currency_id ||
    !amount
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields.",
    });
  }

  if (Number(amount) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Amount must be greater than zero.",
    });
  }

  // Get shop exchange rate
  const rateSql = `
    SELECT buy_rate, sell_rate
    FROM shop_rates
    WHERE shop_id = ?
      AND currency_id = ?
  `;

  db.query(rateSql, [shopId, currency_id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Exchange rate not found.",
      });
    }

    const rate =
      transaction_type === "sell"
        ? Number(result[0].buy_rate)
        : Number(result[0].sell_rate);

    const total_npr = Number(amount) * rate;

    // Generate Receipt Number
    const receiptSql = `
SELECT MAX(id) AS lastId
FROM transactions
`;

    db.query(receiptSql, (err, receiptResult) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      const year = new Date().getFullYear();

const nextId = (receiptResult[0].lastId || 0) + 1;

const receiptNumber =
  "FX" + year + String(nextId).padStart(6, "0");

      // Save Transaction
      const insertSql = `
        INSERT INTO transactions
        (
          customer_name,
          customer_email,
          customer_phone,
          country,
          passport_number,
          shop_id,
          currency_id,
          transaction_type,
          amount,
          rate,
          total_npr,
          receipt_number
        )
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
      `;

      db.query(
        insertSql,
        [
          customer_name,
          customer_email || null,
          customer_phone || null,
          country,
          passport_number,
          shopId,
          currency_id,
          transaction_type,
          amount,
          rate,
          total_npr,
          receiptNumber,
        ],
        (err) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: err.message,
            });
          }

          return res.json({
            success: true,
            message: "Exchange completed successfully.",
            receipt_number: receiptNumber,
            total_npr,
          });
        },
      );
    });
  });
};

// =====================================
// Get All Transactions
// =====================================
const getTransactions = (req, res) => {
  const shopId = req.user.id;

  const sql = `
    SELECT
      t.id,
      t.receipt_number,
      t.customer_name,
      t.passport_number,
      c.code,
      t.transaction_type,
      t.amount,
      t.rate,
      t.total_npr,
      t.created_at

    FROM transactions t

    JOIN currencies c
      ON t.currency_id = c.id

    WHERE t.shop_id = ?

    ORDER BY t.created_at DESC
  `;

  db.query(sql, [shopId], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.json({
      success: true,
      data: result,
    });
  });
};

// =====================================
// Get Receipt Details
// =====================================
const getReceipt = (req, res) => {
  const shopId = req.user.id;
  const { receiptNumber } = req.params;

  const sql = `
    SELECT
      t.*,
      c.code,
      c.name,
      u.shop_name,
      u.shop_address,
      u.phone2

    FROM transactions t

    JOIN currencies c
      ON t.currency_id = c.id

    JOIN users u
      ON t.shop_id = u.id

    WHERE
      t.receipt_number = ?
      AND t.shop_id = ?
  `;

  db.query(sql, [receiptNumber, shopId], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Receipt not found.",
      });
    }

    res.json({
      success: true,
      data: result[0],
    });
  });
};

// =====================================
// Delete Transaction
// =====================================
const deleteTransaction = (req, res) => {
  const shopId = req.user.id;
  const { id } = req.params;

  const sql = `
    DELETE FROM transactions
    WHERE id = ?
      AND shop_id = ?
  `;

  db.query(sql, [id, shopId], (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.json({
      success: true,
      message: "Transaction deleted successfully.",
    });
  });
};

// =====================================
// Exports
// =====================================
module.exports = {
  createTransaction,
  getTransactions,
  getReceipt,
  deleteTransaction,
};
