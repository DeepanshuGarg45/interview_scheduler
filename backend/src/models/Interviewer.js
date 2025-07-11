const pool = require('../config/database');

class Interviewer {
  static async findAll() {
    const result = await pool.query('SELECT * FROM interviewers ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM interviewers WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { name, email, department, role, is_available } = data;
    const result = await pool.query(
      'INSERT INTO interviewers (name, email, department, role, is_available) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, department, role, is_available ?? true]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { name, email, department, role, is_available } = data;
    const result = await pool.query(
      'UPDATE interviewers SET name = $1, email = $2, department = $3, role = $4, is_available = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [name, email, department, role, is_available, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM interviewers WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Interviewer;
