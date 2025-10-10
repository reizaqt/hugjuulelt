const db = require('../db');

// GET all
const getAllCategories = (req, res) => {
  db.query('SELECT * FROM appointment_status', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// CREATE
const createCategory = (req, res) => {
  const { status_name } = req.body;
  db.query(
    'INSERT INTO appointment_status (status_name) VALUES (?)',
    [status_name],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, status_name });
    }
  );
};

// UPDATE
const updateCategory = (req, res) => {
  const { id } = req.params;
  const { status_name } = req.body;
  db.query(
    'UPDATE appointment_status SET status_name=? WHERE status_id=?',
    [status_name, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, status_name });
    }
  );
};

// DELETE
const deleteCategory = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM appointment_status WHERE status_id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.sendStatus(204);
  });
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
