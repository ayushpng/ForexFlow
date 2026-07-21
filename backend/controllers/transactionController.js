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

  // Get today's shop rate
  const rateSql = `
SELECT
  buy_rate,
  sell_rate
FROM shop_rates
WHERE
  shop_id = ?
AND
  currency_id = ?
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
    const receiptSql = `
SELECT COUNT(*) AS total
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

      const receiptNumber =
        "FX" + year + String(receiptResult[0].total + 1).padStart(6, "0");
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
      console.log(receiptNumber);
    });

    console.log(rate);
    console.log(total_npr);
  });
};

module.exports = {
  createTransaction,
};
