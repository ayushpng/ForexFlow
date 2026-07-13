const bcrypt = require("bcrypt");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
const register = async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone,
      phone2,
      address,
      password,
      role,
      shop_name,
      shop_address,
      license_number,
    } = req.body;

    // ================= Validation =================

    if (
      !full_name?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !address?.trim() ||
      !password?.trim() ||
      !role?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields are required.",
      });
    }

    if (!["customer", "shopkeeper"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role selected.",
      });
    }

    if (role === "shopkeeper") {
      if (
        !shop_name?.trim() ||
        !shop_address?.trim() ||
        !license_number?.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Please complete all shop details.",
        });
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address.",
      });
    }

    const phoneRegex = /^98\d{8}$/;

    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message:
          "Phone number must start with 98 and contain 10 digits.",
      });
    }

    if (phone2 && !phoneRegex.test(phone2)) {
      return res.status(400).json({
        success: false,
        message: "Alternate phone number is invalid.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    // ================= Check Email =================

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }

        if (result.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Email already registered.",
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const status =
          role === "shopkeeper" ? "pending" : "approved";

        db.query(
          `INSERT INTO users
          (
            full_name,
            email,
            phone,
            phone2,
            address,
            password,
            role,
            status,
            shop_name,
            shop_address,
            license_number
          )
          VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
          [
            full_name,
            email,
            phone,
            phone2 || null,
            address,
            hashedPassword,
            role,
            status,
            shop_name || null,
            shop_address || null,
            license_number || null,
          ],
          (err) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: err.message,
              });
            }

            return res.status(201).json({
              success: true,
              message:
                role === "shopkeeper"
                  ? "Registration successful. Please wait for admin approval."
                  : "Registration successful.",
            });
          }
        );
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= LOGIN =================

const login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      if (result.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });
      }

      const user = result[0];

      const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
      );

      if (!isPasswordCorrect) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });
      }

      // Shopkeeper approval check

      if (
        user.role === "shopkeeper" &&
        user.status === "pending"
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Your shop registration is waiting for admin approval.",
        });
      }

      if (
        user.role === "shopkeeper" &&
        user.status === "rejected"
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Your shop registration has been rejected.",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.status(200).json({
        success: true,
        message: "Login Successful",
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
          status: user.status,
          shop_name: user.shop_name,
        },
      });
    }
  );
};

module.exports = {
  register,
  login,
};