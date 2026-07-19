const db = require("../config/db");

// ==============================
// Get Shop Rates
// ==============================
const getShopRates = (req, res) => {
  const shopId = 1; // Later this will come from logged-in user

  const sql = `
    SELECT
      c.id,
      c.code,
      c.name,
      c.flag,

      ar.min_buy,
      ar.max_buy,
      ar.min_sell,
      ar.max_sell,

      sr.buy_rate,
      sr.sell_rate

    FROM currencies c

    LEFT JOIN admin_rates ar
      ON c.id = ar.currency_id

    LEFT JOIN shop_rates sr
      ON c.id = sr.currency_id
      AND sr.shop_id = ?

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

// ==============================
// Save Shop Rate
// ==============================
const saveShopRate = (req, res) => {
  const shopId = req.body.shop_id;
  const currencyId = req.params.currencyId;

  const { buy_rate, sell_rate } = req.body;

  // Validate against admin limits
  const adminSql = `
    SELECT
      min_buy,
      max_buy,
      min_sell,
      max_sell
    FROM admin_rates
    WHERE currency_id = ?
  `;

  db.query(adminSql, [currencyId], (err, admin) => {
    if (err)
      return res.status(500).json({
        success: false,
        message: err.message,
      });

    if (admin.length === 0)
      return res.status(404).json({
        success: false,
        message: "Admin rates not found",
      });

    const rate = admin[0];

    if (
      Number(buy_rate) < Number(rate.min_buy) ||
      Number(buy_rate) > Number(rate.max_buy)
    ) {
      return res.status(400).json({
        success: false,
        message: `Buy rate must be between ${rate.min_buy} and ${rate.max_buy}`,
      });
    }

    if (
      Number(sell_rate) < Number(rate.min_sell) ||
      Number(sell_rate) > Number(rate.max_sell)
    ) {
      return res.status(400).json({
        success: false,
        message: `Sell rate must be between ${rate.min_sell} and ${rate.max_sell}`,
      });
    }

    const checkSql =
      "SELECT * FROM shop_rates WHERE shop_id=? AND currency_id=?";

    db.query(checkSql, [shopId, currencyId], (err, result) => {
      if (err)
        return res.status(500).json({
          success: false,
          message: err.message,
        });

      if (result.length === 0) {
        const insertSql = `
          INSERT INTO shop_rates
          (shop_id,currency_id,buy_rate,sell_rate)
          VALUES(?,?,?,?)
        `;

        db.query(
          insertSql,
          [shopId, currencyId, buy_rate, sell_rate],
          (err) => {
            if (err)
              return res.status(500).json({
                success: false,
                message: err.message,
              });

            res.json({
              success: true,
              message: "Today's rate saved successfully",
            });
          },
        );
      } else {
        const updateSql = `
          UPDATE shop_rates
          SET
            buy_rate=?,
            sell_rate=?
          WHERE
            shop_id=?
          AND
            currency_id=?
        `;

        db.query(
          updateSql,
          [buy_rate, sell_rate, shopId, currencyId],
          (err) => {
            if (err)
              return res.status(500).json({
                success: false,
                message: err.message,
              });

            res.json({
              success: true,
              message: "Today's rate updated successfully",
            });
          },
        );
      }
    });
  });
};

module.exports = {
  getShopRates,
  saveShopRate,
};
