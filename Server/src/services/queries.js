import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const users = {
  insertUser: `INSERT INTO users( firstname, lastname, email , password, address ,bio, occupation, expertise) VALUES($1 ,$2, $3, $4, $5, $6, $7, $8) RETURNING *`,
  isUserExist: `SELECT * FROM users WHERE email = $1`,
  findByid: `SELECT * FROM users WHERE id=$1`,
  userToMentor: `UPDATE users SET isMentor=$1 WHERE id=$2 RETURNING *`,
  isAdmin: `SELECT isadmin FROM users WHERE isadmin='true'`,
  findAllMentors: `SELECT firstname, lastname, email, address, bio, occupation, expertise, isMentor, isAdmin FROM users WHERE isMentor='true'`
};


export default { users };
