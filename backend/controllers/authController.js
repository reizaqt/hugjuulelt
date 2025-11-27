const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function getProfileForRole(roleId, userId) {
  const conn = await pool.getConnection();
  try {
    if (roleId === 2) { // organization owner
      const [rows] = await conn.query('SELECT * FROM organization WHERE user_id = ?', [userId]);
      return rows[0] || null;
    } else if (roleId === 3) { // customer
      const [rows] = await conn.query('SELECT * FROM customer WHERE user_id = ?', [userId]);
      return rows[0] || null;
    } else if (roleId === 4) { // org-employee
      const [rows] = await conn.query('SELECT e.*, o.org_id, o.org_name FROM employees e LEFT JOIN organization o ON e.org_id = o.org_id WHERE e.user_id = ?', [userId]);
      return rows[0] || null;
    } else if (roleId === 1) { // superadmin
      return { role: 'superadmin' };
    }
    return null;
  } finally {
    conn.release();
  }
}

exports.register = async (req, res) => {
  // Public registration: only allow customer self-register (role_id = 3).
  // SuperAdmin / Organization creation should be protected endpoints.
  try {
    const { phone, password, name, email } = req.body;
    const role_id = 3;

    if (!phone || !password) return res.status(400).json({ error: 'phone болон password шаардлагатай' });
    if (typeof password !== 'string' || password.length < 6) return res.status(400).json({ error: 'password дор хаяж 6 тэмдэгт байх ёстой' });

    const conn = await pool.getConnection();
    try {
      // Check duplicate phone
      const [existing] = await conn.query('SELECT user_id FROM users WHERE phone = ?', [phone]);
      if (existing.length > 0) return res.status(409).json({ error: 'Өгөгдсөн утас өмнө нь бүртгэгдсэн' });

      const hashed = await bcrypt.hash(password, 10);
      const [r] = await conn.query('INSERT INTO users (role_id, phone, password_hash) VALUES (?, ?, ?)', [role_id, phone, hashed]);
      const userId = r.insertId;

      await conn.query('INSERT INTO customer (user_id, cus_name, cus_email) VALUES (?, ?, ?)', [userId, name || '', email || '']);

      res.status(201).json({ message: 'Customer бүртгэл амжилттай үүслээ', userId });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Сервер алдаа' });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) return res.status(400).json({ error: 'phone болон password шаардлагатай' });

    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query('SELECT * FROM users WHERE phone = ?', [phone]);
      if (rows.length === 0) return res.status(401).json({ error: 'Хэрэглэгч олдсонгүй' });
      const user = rows[0];

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) return res.status(401).json({ error: 'Нууц үг буруу' });

      const roleId = user.role_id;
      // Create token with minimal payload
      const token = jwt.sign({ userId: user.user_id, roleId }, process.env.JWT_SECRET, { expiresIn: '8h' });

      // Get minimal profile (NOT including password)
      const profile = await getProfileForRole(roleId, user.user_id);

      res.json({ token, roleId, profile });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Сервер алдаа' });
  }
};
