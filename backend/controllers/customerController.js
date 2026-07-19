const db = require("../config/db");

// ===============================
// Search Best Exchange Rates
// ===============================
const searchRates = (req, res) => {
  const { currency, type } = req.query;

  if (!currency || !type) {
    return res.status(400).json({
      success: false,
      message: "Currency and transaction type are required.",
    });
  }

  const orderBy = type === "sell" ? "sr.buy_rate DESC" : "sr.sell_rate ASC";

  const sql = `
    SELECT
      u.id,
      u.shop_name,
      c.code,
      c.name,
      c.flag,
      sr.buy_rate,
      sr.sell_rate,
      sr.updated_at

    FROM shop_rates sr

    JOIN users u
      ON sr.shop_id = u.id

    JOIN currencies c
      ON sr.currency_id = c.id

    WHERE
      u.role = 'shopkeeper'
      AND u.status = 'approved'
      AND c.code = ?

    ORDER BY ${orderBy}
  `;

  db.query(sql, [currency], (err, result) => {
    if (err) {
      console.log(err);

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
// ======================================
// Get All Approved Shops
// ======================================
const getAllShops = (req, res) => {
  const sql = `
    SELECT
      u.id,
      u.shop_name,
      u.shop_address,
      u.phone2,
      c.code,
      c.flag,
      sr.buy_rate,
      sr.sell_rate,
      sr.updated_at

    FROM users u

    LEFT JOIN shop_rates sr
      ON u.id = sr.shop_id

    LEFT JOIN currencies c
      ON sr.currency_id = c.id

    WHERE
      u.role='shopkeeper'
      AND u.status='approved'
      AND c.code='USD'

    ORDER BY
      u.shop_name ASC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

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
// ======================================
// Get Shop Details
// ======================================
const getShopDetails = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT
      u.id,
      u.shop_name,
      u.shop_address,
      u.phone2,
      u.email,
      u.license_number,
      c.code,
      c.name,
      c.flag,
      sr.buy_rate,
      sr.sell_rate,
      sr.updated_at

    FROM users u

    JOIN shop_rates sr
      ON u.id = sr.shop_id

    JOIN currencies c
      ON sr.currency_id = c.id

    WHERE u.id = ?

    ORDER BY
CASE c.code
    WHEN 'USD' THEN 1
    WHEN 'EUR' THEN 2
    WHEN 'GBP' THEN 3
    WHEN 'AUD' THEN 4
    WHEN 'CAD' THEN 5
    WHEN 'JPY' THEN 6
    WHEN 'CHF' THEN 7
    WHEN 'CNY' THEN 8
    WHEN 'AED' THEN 9
    WHEN 'SAR' THEN 10
    WHEN 'QAR' THEN 11
    WHEN 'KWD' THEN 12
    WHEN 'BHD' THEN 13
    WHEN 'OMR' THEN 14
    WHEN 'SGD' THEN 15
    WHEN 'MYR' THEN 16
    WHEN 'HKD' THEN 17
    WHEN 'THB' THEN 18
    WHEN 'SEK' THEN 19
    WHEN 'DKK' THEN 20
    ELSE 999
END
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    res.json({
      success: true,
      shop: {
        id: result[0].id,
        shop_name: result[0].shop_name,
        shop_address: result[0].shop_address,
        phone2: result[0].phone2,
        email: result[0].email,
        license_number: result[0].license_number,
      },
      rates: result,
    });
  });
};
module.exports = {
  searchRates,
  getAllShops,
  getShopDetails,
};
