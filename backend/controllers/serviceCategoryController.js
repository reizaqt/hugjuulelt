const db = require('../db'); // чиний db холболт

// GET all
const getAllCategories = (req, res) => {
  db.query('SELECT * FROM service_category', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// CREATE
const createCategory = (req, res) => {
  const { sc_name, sc_desc } = req.body;
  db.query(
    'INSERT INTO service_category (sc_name, sc_desc) VALUES (?, ?)',
    [sc_name, sc_desc],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, sc_name, sc_desc });
    }
  );
};

// UPDATE
const updateCategory = (req, res) => {
  const { id } = req.params;
  const { sc_name, sc_desc } = req.body;
  db.query(
    'UPDATE service_category SET sc_name=?, sc_desc=? WHERE sc_id=?',
    [sc_name, sc_desc, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, sc_name, sc_desc });
    }
  );
};

// DELETE
const deleteCategory = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM service_category WHERE sc_id=?', [id], (err) => {
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
