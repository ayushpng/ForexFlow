const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, ".env"),
});

console.log("APP DB_USER:", process.env.DB_USER);

require("./config/db");

const app = express();

// ================= Middleware =================
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.json());

// ================= Routes =================
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const shopRoutes = require("./routes/shopRoutes");
const customerRoutes = require("./routes/customerRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/customer", customerRoutes);

// ================= Test Route =================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to ForexFlow API 🚀",
  });
});

module.exports = app;