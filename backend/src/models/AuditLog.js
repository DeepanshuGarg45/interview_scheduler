const pool = require('../config/database');

class AuditLog {
  static async create({ action, user_id, resource_type, resource_id, details, ip_address, user_agent }) {
    const result = await pool.query(
      'INSERT INTO audit_logs (action, user_id, resource_type, resource_id, details, ip_address, user_agent) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [action, user_id, resource_type, resource_id, details, ip_address, user_agent]
    );
    return result.rows[0];
  }

  static async findAll() {
    const result = await pool.query('SELECT * FROM audit_logs ORDER BY created_at DESC');
    return result.rows;
  }
}

module.exports = AuditLog;
