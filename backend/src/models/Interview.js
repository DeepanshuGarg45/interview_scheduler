const pool = require('../config/database');

class Interview {
  static async findAll() {
    const query = `
      SELECT i.*, c.name as candidate_name, c.email as candidate_email,
             int.name as interviewer_name, int.email as interviewer_email
      FROM interviews i
      LEFT JOIN candidates c ON i.candidate_id = c.id
      LEFT JOIN interviewers int ON i.interviewer_id = int.id
      ORDER BY i.interview_date DESC, i.interview_time DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = `
      SELECT i.*, c.name as candidate_name, c.email as candidate_email,
             int.name as interviewer_name, int.email as interviewer_email
      FROM interviews i
      LEFT JOIN candidates c ON i.candidate_id = c.id
      LEFT JOIN interviewers int ON i.interviewer_id = int.id
      WHERE i.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async create(interviewData) {
    const {
      candidate_id, interviewer_id, interview_date, interview_time,
      duration, type, notes
    } = interviewData;

    const query = `
      INSERT INTO interviews (candidate_id, interviewer_id, interview_date,
                              interview_time, duration, type, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [candidate_id, interviewer_id, interview_date, interview_time,
                   duration || 60, type, notes];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async update(id, interviewData) {
    const {
      candidate_id, interviewer_id, interview_date, interview_time,
      duration, type, status, notes, feedback, rating
    } = interviewData;

    const query = `
      UPDATE interviews
      SET candidate_id = $1, interviewer_id = $2, interview_date = $3,
          interview_time = $4, duration = $5, type = $6, status = $7,
          notes = $8, feedback = $9, rating = $10, updated_at = CURRENT_TIMESTAMP
      WHERE id = $11
      RETURNING *
    `;
    const values = [candidate_id, interviewer_id, interview_date, interview_time,
                   duration, type, status, notes, feedback, rating, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM interviews WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async checkConflicts(interviewer_id, interview_date, interview_time, duration = 60) {
    const query = `
      SELECT * FROM interviews
      WHERE interviewer_id = $1
      AND interview_date = $2
      AND (
        (interview_time <= $3 AND interview_time + INTERVAL '1 minute' * duration > $3)
        OR
        (interview_time < $3 + INTERVAL '1 minute' * $4 AND interview_time >= $3)
      )
    `;
    const result = await pool.query(query, [interviewer_id, interview_date, interview_time, duration]);
    return result.rows;
  }
}

module.exports = Interview;
