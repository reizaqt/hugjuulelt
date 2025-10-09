const mysql = require('mysql2');
require('dotenv').config(); // .env 

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) console.error('MySQL холболт амжилтгүй:', err);
  else console.log('MySQL холбогдлоо');
});

module.exports = db;
