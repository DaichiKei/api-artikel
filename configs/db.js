const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config()

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,  // Menunggu jika semua koneksi sedang digunakan
  connectionLimit: 10,       // Jumlah maksimum koneksi di dalam pool
  queueLimit: 0,             // Tidak ada batas antrian koneksi
  acquireTimeout: 10000      // Timeout untuk mendapatkan koneksi dalam milidetik
});

module.exports = pool;