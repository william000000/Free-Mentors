import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const executeQuery = async (myQuery, params = []) => {
  const result = await pool.query(myQuery, params);
    return result.rows || result;
  };

export default executeQuery; 