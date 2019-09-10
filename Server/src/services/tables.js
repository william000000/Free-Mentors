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

  const dummyData = [
    `INSERT INTO users(firstname, lastname, email, password, address, bio, occupation, expertise, isMentor, isAdmin) VALUES('willy', 'tony', 'willy@gmail.com','$2b$10$wMMYrM3BLcfZ2EdHd24tuO8bdgaBdn7jQYn1IeD8iTMy28l.NhBgG', 'Kigali','Am doctor of Teeth', 'Nurse', 'Nurse', 'false', 'false')`,

    `INSERT INTO users(firstname, lastname, email, password, address, bio, occupation, expertise, isMentor, isAdmin) VALUES('bob', 'marley', 'bob@gmail.com','$2b$10$wMMYrM3BLcfZ2EdHd24tuO8bdgaBdn7jQYn1IeD8iTMy28l.NhBgG', 'jamaica','Am singer in Reggae style', 'Singer', 'Singer', 'false', 'true')`,

    `INSERT INTO users(firstname, lastname, email, password, address, bio, occupation, expertise, isMentor, isAdmin) VALUES('willo', 'titoo', 'willo@gmail.com','$2b$10$wMMYrM3BLcfZ2EdHd24tuO8bdgaBdn7jQYn1IeD8iTMy28l.NhBgG', 'Kigali','Am doctor of Teeth', 'Nurse', 'Nurse', 'false','false')`,


    `INSERT INTO users(firstname, lastname, email, password, address, bio, occupation, expertise, isMentor, isAdmin) VALUES('willy', 'tony', 'wilp@gmail.com','$2b$10$wMMYrM3BLcfZ2EdHd24tuO8bdgaBdn7jQYn1IeD8iTMy28l.NhBgG', 'Kigali','Am doctor of Teeth', 'Nurser', 'Nurse', 'true', 'false')`,

    `INSERT INTO users(firstname, lastname, email, password, address, bio, occupation, expertise, isMentor, isAdmin) VALUES('wihhh', 'kevin', 'kev@gmail.com','$2b$10$wMMYrM3BLcfZ2EdHd24tuO8bdgaBdn7jQYn1IeD8iTMy28l.NhBgG', 'Kigali','Am doctor of Teeth', 'Nurser', 'Nurse', 'true', 'false')`,


    `INSERT INTO mentorships(mentorId, mentorEmail, menteeId, questions, menteeEmail, status) VALUES(1, 'wilp@gmail.com', 1, 'what required to be a programmer', 'willy@gmail.com', 'pending')`,

    `INSERT INTO mentorships(mentorId, mentorEmail, menteeId, questions, menteeEmail, status) VALUES(2, 'kev@gmail.com', 3, 'what required to be a programmer', 'willo@gmail.com', 'accepted')`,

    `INSERT INTO mentorships(mentorId, mentorEmail, menteeId, questions, menteeEmail, status) VALUES(2, 'kev@gmail.com', 3, 'what is it', 'willo@gmail.com', 'rejected')`,

    `INSERT INTO reviews(id,mentorId, mentorEmail, menteeId, score, menteeEmail, menteeFullName, remark) VALUES(1, 1, 'wilp@gmail.com', 1, 4, 'willy@gmail.com', 'willy tony', 'it was good')`,

    `INSERT INTO reviews(id, mentorId, mentorEmail, menteeId, score, menteeEmail, menteeFullName, remark) VALUES(2,2, 'kev@gmail.com', 3, 1, 'willo@gmail.com', 'willo titoo', 'stupid mentor i will ever see in future life..lol')`

  ];

  await pool.query(createUsers);
  await pool.query(createMentorships);
  await pool.query(createReviews);

  if (process.env.NODE_ENV === 'test') {
    for (const datas of dummyData) {
      await pool.query(datas);
    }
  }
};

makeTables();
