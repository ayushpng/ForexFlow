
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
require("./config/db");

const app = express();
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to ForexFlow API 🚀",
  });
});

module.exports = app;