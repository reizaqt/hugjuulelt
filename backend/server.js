const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config(); // .env

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) console.error('Database холболт амжилтгүй:', err);
  else console.log('Database холболт амжилттай');
});

app.get('/', (req, res) => {
  res.send('Server ажиллаж байна!');
});

//reg
app.post('/register', async (req, res) => {
  try {
    const { role_id, phone, password, name, email, address } = req.body;
    if (!phone || !password || !role_id)
      return res.status(400).json({ error: 'phone, password, role_id шаардлагатай' });

    const hash = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO users (role_id, phone, password_hash) VALUES (?, ?, ?)',
      [role_id, phone, hash],
      (err, result) => {
        if (err) return res.status(500).json({ error: 'DB алдаа (users)' });

        const user_id = result.insertId;

        switch (role_id) {
          case 1: // superadmin
          case 2: // organization
            db.query(
              'INSERT INTO organization (user_id, org_name, org_address, email) VALUES (?, ?, ?, ?)',
              [user_id, name || '', address || '', email || ''],
              (oErr) => {
                if (oErr) return res.status(500).json({ error: 'DB алдаа (organization)' });
                res.json({ message: 'Organization амжилттай үүслээ', userId: user_id });
              }
            );
            break;
          case 3: // customer
          case 4: // org-employee
            db.query(
              'INSERT INTO customer (user_id, cus_name, cus_email) VALUES (?, ?, ?)',
              [user_id, name || '', email || ''],
              (cErr) => {
                if (cErr) return res.status(500).json({ error: 'DB алдаа (customer)' });
                res.json({ message: 'Customer амжилттай үүслээ', userId: user_id });
              }
            );
            break;
          default:
            res.status(400).json({ error: 'Тодорхойгүй role_id' });
        }
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Сервер алдаа' });
  }
});

// login
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

    let tableName = '';
    let roleName = '';
    switch (user.role_id) {
      case 1:
        tableName = 'organization'; roleName = 'superadmin'; break;
      case 2:
        tableName = 'organization'; roleName = 'organization'; break;
      case 3:
        tableName = 'customer'; roleName = 'customer'; break;
      case 4:
        tableName = 'customer'; roleName = 'org-employee'; break;
      default:
        return res.status(400).json({ error: 'Тодорхойгүй role_id' });
    }

    db.query(`SELECT * FROM ${tableName} WHERE user_id = ?`, [user.user_id], (tErr, tRes) => {
      if (tErr) return res.status(500).json({ error: `DB алдаа (${tableName})` });
      const payload = { id: user.user_id, role: roleName, info: tRes[0] };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, role: roleName, data: tRes[0] });
    });
  });
});

// ----------------- JWT middleware -----------------
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token байхгүй' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token буруу эсвэл хугацаа дууссан' });
    req.user = user;
    next();
  });
}

// ----------------- Protected route -----------------
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Хамгаалсан маршрут руу амжилттай оров', user: req.user });
});

const organizationRoutes = require('./routes/organizationRoutes');
app.use('/api/organizations', organizationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`));
