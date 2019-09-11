import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
let connection;

connection = (process.env.NODE_ENV == 'test') ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;

const pool = new Pool({ connectionString: connection });

const makeTables = async () => {
  const createUsers =
    `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY UNIQUE,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    address TEXT NOT NULL,
    bio TEXT NOT NULL,
    occupation TEXT NOT NULL,
    expertise TEXT NOT NULL,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isMentor TEXT DEFAULT false,
    isAdmin TEXT DEFAULT false
  )`;


  const createMentorships =
    `
CREATE TABLE IF NOT EXISTS mentorships(
id SERIAL PRIMARY KEY UNIQUE,
mentorId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
mentorEmail TEXT NOT NULL REFERENCES users(email) ON DELETE CASCADE,
menteeId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
questions TEXT NOT NULL,
menteeEmail TEXT NOT NULL REFERENCES users(email) ON DELETE CASCADE,
status TEXT DEFAULT 'pending'
)`;

  const createReviews =
    `
CREATE TABLE IF NOT EXISTS reviews(
  id INTEGER NOT NULL REFERENCES mentorships(id) ON DELETE CASCADE,
  mentorId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mentorEmail TEXT NOT NULL REFERENCES users(email) ON DELETE CASCADE,
  menteeId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  menteeEmail TEXT NOT NULL REFERENCES users(email) ON DELETE CASCADE,
  menteeFullName TEXT NOT NULL,
  remark TEXT NOT NULL
)`;

  await pool.query(createUsers);
  await pool.query(createMentorships);
  await pool.query(createReviews);

};

makeTables();
