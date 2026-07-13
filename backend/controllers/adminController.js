const db = require("../config/db");

// ================= GET PENDING SHOPS =================
const getPendingShops = (req, res) => {
  db.query(
    "SELECT id, full_name, email, phone, shop_name, shop_address, license_number, status FROM users WHERE role = 'shopkeeper' AND status = 'pending'",
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.status(200).json({
        success: true,
        data: result,
      });
    }
  );
};

// ================= APPROVE SHOP =================
const approveShop = (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE users SET status = 'approved' WHERE id = ?",
    [id],
    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.status(200).json({
        success: true,
        message: "Shop approved successfully",
      });
    }
  );
};

// ================= REJECT SHOP =================
const rejectShop = (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE users SET status = 'rejected' WHERE id = ?",
    [id],
    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.status(200).json({
        success: true,
        message: "Shop rejected successfully",
      });
    }
  );
};

module.exports = {
  getPendingShops,
  approveShop,
  rejectShop,
};