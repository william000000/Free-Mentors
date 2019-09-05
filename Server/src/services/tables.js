import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

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
    isAdmin TEXT DEFAULT false
  )`;
  const createMentors =
    `CREATE TABLE IF NOT EXISTS mentors(
  id SERIAL PRIMARY KEY UNIQUE,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  address TEXT NOT NULL,
  bio TEXT NOT NULL,
  occupation TEXT NOT NULL,
  expertise TEXT NOT NULL,
  createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;


  const createMentorships =
    `
CREATE TABLE IF NOT EXISTS mentorships(
id SERIAL PRIMARY KEY UNIQUE,
mentorId INTEGER NOT NULL REFERENCES mentors(id) ON DELETE CASCADE,
mentorEmail TEXT NOT NULL REFERENCES mentors(email) ON DELETE CASCADE,
menteeId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
questions TEXT NOT NULL,
menteeEmail TEXT NOT NULL REFERENCES users(email) ON DELETE CASCADE,
status TEXT DEFAULT 'pending'
)`;

  const createReviews =
    `
CREATE TABLE IF NOT EXISTS reviews(
  id INTEGER NOT NULL REFERENCES mentorships(id) ON DELETE CASCADE,
  mentorId INTEGER NOT NULL REFERENCES mentors(id) ON DELETE CASCADE,
  mentorEmail TEXT NOT NULL REFERENCES mentors(email) ON DELETE CASCADE,
  menteeId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  menteeEmail TEXT NOT NULL REFERENCES users(email) ON DELETE CASCADE,
  menteeFullName TEXT NOT NULL,
  remark TEXT NOT NULL
)`;

  const dummyData = [
    `INSERT INTO users(firstname, lastname, email, password, address, bio, occupation, expertise, isAdmin) VALUES('willy', 'tony', 'willy@gmail.com','$2b$10$wMMYrM3BLcfZ2EdHd24tuO8bdgaBdn7jQYn1IeD8iTMy28l.NhBgG', 'Kigali','Am doctor of Teeth', 'Nurse', 'Nurse', 'false')`,
    
    `INSERT INTO users(firstname, lastname, email, password, address, bio, occupation, expertise, isAdmin) VALUES('bob', 'marley', 'bob@gmail.com','$2b$10$wMMYrM3BLcfZ2EdHd24tuO8bdgaBdn7jQYn1IeD8iTMy28l.NhBgG', 'jamaica','Am singer in Reggae style', 'Singer', 'Singer', 'true')`,

    `INSERT INTO users(firstname, lastname, email, password, address, bio, occupation, expertise, isAdmin) VALUES('willo', 'titoo', 'willo@gmail.com','$2b$10$wMMYrM3BLcfZ2EdHd24tuO8bdgaBdn7jQYn1IeD8iTMy28l.NhBgG', 'Kigali','Am doctor of Teeth', 'Nurse', 'Nurse', 'false')`,
  

    `INSERT INTO mentors(firstname, lastname, email, password, address, bio, occupation, expertise) VALUES('willy', 'tony', 'wilp@gmail.com','$2b$10$wMMYrM3BLcfZ2EdHd24tuO8bdgaBdn7jQYn1IeD8iTMy28l.NhBgG', 'Kigali','Am doctor of Teeth', 'Nurser', 'Nurse')`,

    `INSERT INTO mentors(firstname, lastname, email, password, address, bio, occupation, expertise) VALUES('wihhh', 'kevin', 'kev@gmail.com','$2b$10$wMMYrM3BLcfZ2EdHd24tuO8bdgaBdn7jQYn1IeD8iTMy28l.NhBgG', 'Kigali','Am doctor of Teeth', 'Nurser', 'Nurse')`,
   

    `INSERT INTO mentorships(mentorId, mentorEmail, menteeId, questions, menteeEmail, status) VALUES(1, 'wilp@gmail.com', 1, 'what required to be a programmer', 'willy@gmail.com', 'pending')`,
  
    `INSERT INTO mentorships(mentorId, mentorEmail, menteeId, questions, menteeEmail, status) VALUES(2, 'kev@gmail.com', 3, 'what required to be a programmer', 'willo@gmail.com', 'accepted')`,

    `INSERT INTO mentorships(mentorId, mentorEmail, menteeId, questions, menteeEmail, status) VALUES(2, 'kev@gmail.com', 3, 'what is it', 'willo@gmail.com', 'rejected')`,
   
    `INSERT INTO reviews(id,mentorId, mentorEmail, menteeId, score, menteeEmail, menteeFullName, remark) VALUES(1, 1, 'wilp@gmail.com', 1, 4, 'willy@gmail.com', 'willy tony', 'it was good')`,
 
    `INSERT INTO reviews(id, mentorId, mentorEmail, menteeId, score, menteeEmail, menteeFullName, remark) VALUES(2,2, 'kev@gmail.com', 3, 1, 'willo@gmail.com', 'willo titoo', 'stupid mentor i will ever see in future life..lol')`
    
  ];

  await pool.query(createUsers);
  await pool.query(createMentors);
  await pool.query(createMentorships);
  await pool.query(createReviews);
 

  for (const datas of dummyData) {
    await pool.query(datas);
   
  }
};

makeTables();
