const db = require("../config/db");

// =============================
// Get all admin exchange rates
// =============================
const getAdminRates = (req, res) => {
  const sql = `
    SELECT
      c.id,
      c.code,
      c.name,
      c.country,
      c.flag,
      ar.min_buy,
      ar.max_buy,
      ar.min_sell,
      ar.max_sell,
      ar.updated_at
    FROM currencies c

    LEFT JOIN admin_rates ar
      ON c.id = ar.currency_id

    ORDER BY FIELD(
      c.code,
      'USD',
      'EUR',
      'GBP',
      'AUD',
      'CAD',
      'JPY',
      'CNY',
      'CHF',
      'SGD',
      'AED',
      'SAR',
      'QAR',
      'THB',
      'MYR',
      'HKD',
      'KWD',
      'BHD',
      'OMR',
      'SEK',
      'DKK'
    )
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
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

// =============================
// Save or Update Admin Rates
// =============================

const saveAdminRate = (req, res) => {
  console.log("Body:", req.body);
console.log("Currency ID:", req.params.currencyId);
  const currencyId = req.params.currencyId;

  const { min_buy, max_buy, min_sell, max_sell } = req.body;

  // Convert empty values to NULL

  const cleanValue = (value) => {
    return value === "" ? null : value;
  };

  const minBuy = cleanValue(min_buy);
  const maxBuy = cleanValue(max_buy);
  const minSell = cleanValue(min_sell);
  const maxSell = cleanValue(max_sell);

  // =============================
  // Validate rates
  // =============================

  if (minBuy !== null && maxBuy !== null && Number(minBuy) >= Number(maxBuy)) {
    return res.status(400).json({
      success: false,
      message: "Minimum buy rate must be lower than maximum buy rate",
    });
  }

  if (
    minSell !== null &&
    maxSell !== null &&
    Number(minSell) >= Number(maxSell)
  ) {
    return res.status(400).json({
      success: false,
      message: "Minimum sell rate must be lower than maximum sell rate",
    });
  }

  // Check existing rate

  const checkSql = `
    SELECT id 
    FROM admin_rates
    WHERE currency_id = ?
  `;

  db.query(checkSql, [currencyId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    // =============================
    // Insert new rate
    // =============================

    if (result.length === 0) {
      const insertSql = `

          INSERT INTO admin_rates
          (
            currency_id,
            min_buy,
            max_buy,
            min_sell,
            max_sell
           
          )

          VALUES(?,?,?,?,?)

        `;

      db.query(
        insertSql,

        [currencyId, minBuy, maxBuy, minSell, maxSell],

        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({
              success: false,
              message: err.message,
            });
          }

          res.json({
            success: true,
            message: "Rates saved successfully",
          });
        },
      );
    }

    // =============================
    // Update existing rate
    // =============================
    else {
      const updateSql = `

          UPDATE admin_rates

          SET

            min_buy=?,
            max_buy=?,
            min_sell=?,
            max_sell=?
            

          WHERE currency_id=?

        `;

      db.query(
        updateSql,

        [minBuy, maxBuy, minSell, maxSell, currencyId],

        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({
              success: false,
              message: err.message,
            });
          }

          res.json({
            success: true,
            message: "Rates updated successfully",
          });
        },
      );
    }
  });
};

module.exports = {
  getAdminRates,
  saveAdminRate,
};
