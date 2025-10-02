const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: 'Password@123',
  database: 'beauty_salon_booking'
};
const JWT_SECRET = 'secretKey123';

const db = mysql.createConnection(DB_CONFIG);

db.connect((err) => {
  if (err) console.error('Database холболт амжилтгүй:', err);
  else console.log('Database холболт амжилттай');
});

app.get('/', (req, res) => {
  res.send('Server ажиллаж байна!');
});

// ---------- Register ----------
app.post('/register', async (req, res) => {
  try {
    const { role_id = 2, phone, password } = req.body;
    if (!phone || !password)
      return res.status(400).json({ error: 'phone, password шаардлагатай' });

    const hash = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO users (role_id, phone, password_hash) VALUES (?, ?, ?)',
      [role_id, phone, hash],
      (err, result) => {
        if (err) return res.status(500).json({ error: 'DB алдаа (users)' });

        const user_id = result.insertId;

        if (role_id === 2) {
          db.query(
            'INSERT INTO customer (user_id, cus_name, cus_email) VALUES (?, ?, ?)',
            [user_id, '', ''],
            (cErr) => {
              if (cErr) return res.status(500).json({ error: 'DB алдаа (customer)' });
              res.json({ message: 'Customer амжилттай үүслээ', userId: user_id });
            }
          );
        } else if (role_id === 1) { 
          db.query(
            'INSERT INTO organization (user_id, org_name, org_address, email) VALUES (?, ?, ?, ?)',
            [user_id, '', '', ''],
            (oErr) => {
              if (oErr) return res.status(500).json({ error: 'DB алдаа (organization)' });
              res.json({ message: 'Organization амжилттай үүслээ', userId: user_id });
            }
          );
        } else {
          res.status(400).json({ error: 'Тодорхойгүй role_id' });
        }
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Сервер алдаа' });
  }
});

// ---------- Login ----------
app.post('/login', (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password)
    return res.status(400).json({ error: 'phone болон password шаардлагатай' });

  db.query('SELECT * FROM users WHERE phone = ?', [phone], async (err, results) => {
    if (err) return res.status(500).json({ error: 'DB алдаа' });
    if (results.length === 0) return res.status(401).json({ error: 'Хэрэглэгч олдсонгүй' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ error: 'Нууц үг буруу' });

    if (user.role_id === 2) { 
      db.query('SELECT * FROM customer WHERE user_id = ?', [user.user_id], (cErr, cRes) => {
        if (cErr) return res.status(500).json({ error: 'DB алдаа (customer)' });
        const payload = { id: user.user_id, role: 'customer', info: cRes[0] };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: 'customer', data: cRes[0] });
      });
    } else if (user.role_id === 1) { 
      db.query('SELECT * FROM organization WHERE user_id = ?', [user.user_id], (oErr, oRes) => {
        if (oErr) return res.status(500).json({ error: 'DB алдаа (organization)' });
        const payload = { id: user.user_id, role: 'organization', info: oRes[0] };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: 'organization', data: oRes[0] });
      });
    } else {
      res.status(400).json({ error: 'Тодорхойгүй role_id' });
    }
  });
});

// ---------- JWT middleware ----------
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token байхгүй' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token буруу эсвэл хугацаа дууссан' });
    req.user = user;
    next();
  });
}

// ---------- Protected route ----------
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Хамгаалсан маршрут руу амжилттай оров', user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
