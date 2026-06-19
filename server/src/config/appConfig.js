require('dotenv').config();

module.exports = {
  port: Number(process.env.PORT || 3000),
  dbEnabled: process.env.DB_ENABLED === 'true',
  dbHost: process.env.DB_HOST || '127.0.0.1',
  dbPort: Number(process.env.DB_PORT || 3306),
  dbUser: process.env.DB_USER || 'root',
  dbPass: process.env.DB_PASSWORD || '',
  dbName: process.env.DB_NAME || 'campus_snack'
};
