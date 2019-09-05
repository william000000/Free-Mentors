import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const users = {
  insertUser: `INSERT INTO users( firstName, lastName, email , password, address ,bio, occupation, expertise) VALUES($1 ,$2, $3, $4, $5, $6, $7, $8) RETURNING *`,
  isUserExist: `SELECT * FROM users WHERE email = $1`,
};
const mentors = {
  isMentor: `SELECT * FROM mentors WHERE email = $1`
};

export default { users, mentors };
