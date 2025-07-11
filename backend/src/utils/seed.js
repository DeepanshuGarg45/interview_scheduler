const fs = require('fs');
const path = require('path');
const pool = require('../config/database');

(async function () {
  try {
    const sql = fs.readFileSync(path.join(__dirname, '../../seeds/sample_data.sql')).toString();
    await pool.query(sql);
    console.log('Seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
})();
