import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connection;

connection = (process.env.NODE_ENV == 'test') ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;

const pool = new Pool({ connectionString: connection });

const executeQuery = async (myQuery, params = []) => {
  const result = await pool.query(myQuery, params);
  return result.rows || result;
};

export default executeQuery; 