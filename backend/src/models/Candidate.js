const pool = require('../config/database');

class Candidate {
  static async findAll() {
    const query = `
      SELECT id, name, email, phone, position, status, resume_url,
             created_at, updated_at
      FROM candidates
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM candidates WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async create(candidateData) {
    const { name, email, phone, position, status, resume_url } = candidateData;
    const query = `
      INSERT INTO candidates (name, email, phone, position, status, resume_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [name, email, phone, position, status || 'Active', resume_url];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async update(id, candidateData) {
    const { name, email, phone, position, status, resume_url } = candidateData;
    const query = `
      UPDATE candidates
      SET name = $1, email = $2, phone = $3, position = $4,
          status = $5, resume_url = $6, updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING *
    `;
    const values = [name, email, phone, position, status, resume_url, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM candidates WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM candidates WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }
}

module.exports = Candidate;
