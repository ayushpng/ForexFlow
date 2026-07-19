const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "..", ".env"),
});

const mysql = require("mysql2");

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log("❌ Database Connection Failed");
    console.log(err);
    return;
  }

  console.log("✅ MySQL Connected Successfully");
  connection.release();
});

module.exports = pool;
