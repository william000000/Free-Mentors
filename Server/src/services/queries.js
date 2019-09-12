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
  findAllMentors: `SELECT firstname, lastname, email, address, bio, occupation, expertise, isMentor FROM users WHERE isMentor='true'`,
  findOneMentor: `SELECT * FROM users WHERE isMentor='true' AND id=$1`,
  isMentorExist: `SELECT * FROM users WHERE id=$1 and isMentor='true'`
};
const mentorships = {
  isMentorshipExist: `SELECT * FROM mentorships WHERE  mentorId=$1 and questions=$2 and menteeId=$3`,
  createMentorship: `INSERT INTO mentorships(mentorId, mentorEmail, menteeId, questions, menteeEmail) VALUES($1,$2,$3,$4,$5) RETURNING *`,
  isSessionRequested: `SELECT * FROM mentorships WHERE id=$1`,
  acceptSession: `UPDATE mentorships SET status='accepted' WHERE id=$1 RETURNING *`,
  rejectSession: `UPDATE mentorships SET status='rejected' WHERE id=$1 RETURNING *`,
  allSessionsForMentee: `SELECT * FROM mentorships WHERE menteeEmail=$1`,
  allSessionsForMentor: `SELECT * FROM mentorships WHERE mentorEmail=$1`

};

export default { users, mentorships };
