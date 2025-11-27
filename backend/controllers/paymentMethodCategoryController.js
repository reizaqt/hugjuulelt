const db = require('../db');

// GET all
const getAllCategories = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM payment_method');
    res.json(rows);
  } catch (err) {
    console.error("GET ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// CREATE
const createCategory = async (req, res) => {
  const { method_name } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO payment_method (method_name) VALUES (?)',
      [method_name]
    );
    res.json({ method_id: result.insertId, method_name });
  } catch (err) {
    console.error("CREATE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { method_name } = req.body;
  try {
    await db.query('UPDATE payment_method SET method_name=? WHERE method_id=?', [method_name, id]);
    res.json({ method_id: id, method_name });
  } catch (err) {
    console.error("UPDATE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// DELETE
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM payment_method WHERE method_id=?', [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error("DELETE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
