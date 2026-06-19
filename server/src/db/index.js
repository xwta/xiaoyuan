const mysql = require('mysql2/promise');
const config = require('../config/appConfig');

let pool = null;

function getPool() {
  if (!config.dbEnabled) {
    return null;
  }

  if (!pool) {
    pool = mysql.createPool({
      host: config.dbHost,
      port: config.dbPort,
      user: config.dbUser,
      password: config.dbPass,
      database: config.dbName,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  return pool;
}

async function query(sql, params = []) {
  const currentPool = getPool();
  if (!currentPool) {
    return null;
  }

  const [rows] = await currentPool.execute(sql, params);
  return rows;
}

module.exports = {
  getPool,
  query,
  isDbEnabled: () => config.dbEnabled
};
