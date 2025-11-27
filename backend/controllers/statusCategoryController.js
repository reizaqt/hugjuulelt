const db = require('../db');

// GET all
const getAllCategories = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM appointment_status");
    res.json(rows);
  } catch (err) {
    console.error("GET STATUS ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// CREATE
const createCategory = async (req, res) => {
  const { status_name } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO appointment_status (status_name) VALUES (?)",
      [status_name]
    );

    res.json({
      status_id: result.insertId,
      status_name
    });
  } catch (err) {
    console.error("CREATE STATUS ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { status_name } = req.body;

  try {
    await db.query(
      "UPDATE appointment_status SET status_name=? WHERE status_id=?",
      [status_name, id]
    );

    res.json({
      status_id: id,
      status_name
    });
  } catch (err) {
    console.error("UPDATE STATUS ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// DELETE
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM appointment_status WHERE status_id=?", [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error("DELETE STATUS ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
