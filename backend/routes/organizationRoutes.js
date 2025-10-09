// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const db = require('../db'); 
// const JWT_SECRET = process.env.JWT_SECRET || 'secretKey123';

// // create org
// router.post('/', async (req, res) => {
//     try {
//         const { phone, password, org_name, org_address, email } = req.body;

//         if (!phone || !password || !org_name || !org_address || !email) {
//             return res.status(400).json({ error: "Бүх талбарыг бөглөнө үү" });
//         }

//         // create user
//         const hash = await bcrypt.hash(password, 10);
//         db.query(
//             'INSERT INTO users (role_id, phone, password_hash) VALUES (?, ?, ?)',
//             [1, phone, hash],
//             (err, result) => {
//                 if (err) {
//                     console.error(err);
//                     return res.status(500).json({ error: 'DB алдаа (users)' });
//                 }

//                 const user_id = result.insertId;

//                 // org
//                 db.query(
//                     'INSERT INTO organization (user_id, org_name, org_address, email) VALUES (?, ?, ?, ?)',
//                     [user_id, org_name, org_address, email],
//                     (orgErr, orgRes) => {
//                         if (orgErr) {
//                             console.error(orgErr);
//                             return res.status(500).json({ error: 'DB алдаа (organization)' });
//                         }

//                         res.json({
//                             message: 'Organization амжилттай үүслээ',
//                             user_id,
//                             org_id: orgRes.insertId
//                         });
//                     }
//                 );
//             }
//         );

//     } catch (e) {
//         console.error(e);
//         res.status(500).json({ error: 'Сервер алдаа' });
//     }
// });

// // org list
// router.get('/', (req, res) => {
//     db.query('SELECT * FROM organization', (err, results) => {
//         if (err) return res.status(500).json({ error: 'DB алдаа' });
//         res.json(results);
//     });
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db');

// ----------- CREATE -----------
router.post('/', async (req, res) => {
    try {
        const { phone, password, org_name, org_address, email } = req.body;
        if (!phone || !password || !org_name || !org_address || !email) {
            return res.status(400).json({ error: "Бүх талбарыг бөглөнө үү" });
        }

        const hash = await bcrypt.hash(password, 10);
        db.query(
            'INSERT INTO users (role_id, phone, password_hash) VALUES (?, ?, ?)',
            [2, phone, hash],
            (err, result) => {
                if (err) return res.status(500).json({ error: 'DB алдаа (users)' });

                const user_id = result.insertId;
                db.query(
                    'INSERT INTO organization (user_id, org_name, org_address, email) VALUES (?, ?, ?, ?)',
                    [user_id, org_name, org_address, email],
                    (orgErr, orgRes) => {
                        if (orgErr) return res.status(500).json({ error: 'DB алдаа (organization)' });
                        res.json({ message: 'Байгууллага амжилттай үүслээ', org_id: orgRes.insertId });
                    }
                );
            }
        );
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Сервер алдаа' });
    }
});

// ----------- READ -----------
router.get('/', (req, res) => {
    db.query(
        `SELECT o.*, u.phone 
         FROM organization o 
         JOIN users u ON o.user_id = u.user_id`,
        (err, results) => {
            if (err) return res.status(500).json({ error: 'DB алдаа' });
            res.json(results);
        }
    );
});

// ----------- UPDATE -----------
router.put('/:org_id', (req, res) => {
    const { org_id } = req.params;
    const { org_name, org_address, email } = req.body;

    db.query(
        'UPDATE organization SET org_name = ?, org_address = ?, email = ? WHERE org_id = ?',
        [org_name, org_address, email, org_id],
        (err) => {
            if (err) return res.status(500).json({ error: 'DB алдаа' });
            res.json({ message: 'Амжилттай шинэчлэгдлээ' });
        }
    );
});

// ----------- DELETE -----------
router.delete('/:org_id', (req, res) => {
    const { org_id } = req.params;

    // эхлээд user_id-г олно
    db.query('SELECT user_id FROM organization WHERE org_id = ?', [org_id], (err, rows) => {
        if (err || rows.length === 0) return res.status(404).json({ error: 'Байгууллага олдсонгүй' });

        const user_id = rows[0].user_id;
        // эхлээд organization устгана
        db.query('DELETE FROM organization WHERE org_id = ?', [org_id], (orgErr) => {
            if (orgErr) return res.status(500).json({ error: 'DB алдаа (organization)' });

            // users хүснэгтээс устгах
            db.query('DELETE FROM users WHERE user_id = ?', [user_id], (userErr) => {
                if (userErr) return res.status(500).json({ error: 'DB алдаа (users)' });
                res.json({ message: 'Байгууллага амжилттай устлаа' });
            });
        });
    });
});

module.exports = router;
