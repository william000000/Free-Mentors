import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

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
  console.log('dropped');
};

dropTables();


