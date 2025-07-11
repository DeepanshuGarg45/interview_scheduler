const fs = require('fs');
const path = require('path');
const pool = require('../config/database');

(async function () {
  try {
    const migrationsDir = path.join(__dirname, '../../migrations');
    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();
    for (const file of files) {
      console.log('Running migration:', file);
      const sql = fs.readFileSync(path.join(migrationsDir, file)).toString();
      await pool.query(sql);
    }
    console.log('All migrations executed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
})();
