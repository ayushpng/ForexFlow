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
      address,
      password,
      role,
    } = req.body;

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
        message: "All fields are required.",
      });
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
        message: "Phone number must start with 98 and contain 10 digits.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    if (!["customer", "shopkeeper"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role selected.",
      });
    }

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

        db.query(
          `INSERT INTO users
          (full_name,email,phone,address,password,role)
          VALUES (?,?,?,?,?,?)`,
          [
            full_name,
            email,
            phone,
            address,
            hashedPassword,
            role,
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
              message: "Registration Successful",
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
          message: "Invalid email or password",
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
          message: "Invalid email or password",
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
        },
      });
    }
  );
};

module.exports = {
  register,
  login,
};