import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connection;

connection = (process.env.NODE_ENV == 'test') ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;

const pool = new Pool({ connectionString: connection });

const dropTable = [
  `DROP TABLE IF EXISTS reviews`,
  `DROP TABLE IF EXISTS mentorships`,
  `DROP TABLE IF EXISTS mentors CASCADE`,
  `DROP TABLE IF EXISTS users CASCADE`
];

const dropTables = async () => {
  for (const i of dropTable) {
    await pool.query(i);
  }
};

dropTables();


