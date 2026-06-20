const fs = require('fs');
const path = require('path');
const { getPool } = require('../src/db');

async function main() {
  const pool = getPool();
  if (!pool) {
    console.log('database mode is not enabled');
    return;
  }

  const dir = path.join(__dirname, '../../database/migrations');
  const files = fs.readdirSync(dir).filter(file => file.endsWith('.sql')).sort();

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const sql = fs.readFileSync(fullPath, 'utf8');
    const statements = sql.split(';').map(item => item.trim()).filter(Boolean);

    for (const statement of statements) {
      await pool.query(statement);
    }

    console.log(`done: ${file}`);
  }

  await pool.end();
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
