require('dotenv').config();
const { Pool } = require('pg');

const connectionString = process.env.DB_URI;

const pool = new Pool({ connectionString });

module.exports = pool;