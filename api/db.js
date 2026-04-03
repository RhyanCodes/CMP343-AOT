const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL
    ? { rejectUnauthorized: false }
    : false,
});

// Log connection status (visible in Vercel function logs)
pool.query("SELECT 1").then(() => console.log("DB connected")).catch(e => console.error("DB error:", e.message));

module.exports = pool;
