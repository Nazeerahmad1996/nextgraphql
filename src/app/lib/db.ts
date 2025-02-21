// lib/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.PG_USER,    // PostgreSQL user from environment variables
  host: process.env.PG_HOST,    // Hostname of PostgreSQL database
  database: process.env.PG_DATABASE,  // Name of database
  password: process.env.PG_PASSWORD,  // Database password
  port: parseInt(process.env.PG_PORT || '5432', 10),  // Default Postgres port
});

export const query = async (text: string, params?: any[]) => {
  const res = await pool.query(text, params);
  return res;
};
