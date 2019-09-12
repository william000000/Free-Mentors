import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const password = process.env.PASSWORD;
const user1 = jwt.sign({
  id: 1,
  firstName: 'willy',
  lastName: 'tony',
  email: 'willy@gmail.com',
  password: password,
  address: 'Kigali',
  bio: 'Am doctor of Teeth',
  occupation: 'Nurse',
  expertise: 'Nurse',
  isAdmin: false
}, process.env.secretKey);
const verify1 = jwt.verify(user1, process.env.secretKey);


const adminUser2 = jwt.sign({
  id: 2,
  firstName: 'bob',
  lastName: 'marley',
  email: 'bob@gmail.com',
  password: password,
  address: 'jamaica',
  bio: 'Am singer in Reggae style',
  occupation: 'Singer',
  expertise: 'Singer',
  isAdmin: true
}, process.env.secretKey);
const verifyAdmin = jwt.verify(adminUser2, process.env.secretKey);

const user3 = jwt.sign({
  id: 3,
  firstName: 'willo',
  lastName: 'titoo',
  email: 'willo@gmail.com',
  password: password,
  address: 'Kigali',
  bio: 'Am doctor of Teeth',
  occupation: 'Nurse',
  expertise: 'Nurse',
  isAdmin: false
}, process.env.secretKey);
const verify3 = jwt.verify(user3, process.env.secretKey);

const mentorUser4 = jwt.sign({
  id: 4,
  firstName: 'willy',
  lastName: 'tony',
  email: 'wilp@gmail.com',
  password: password,
  address: 'Kigali',
  bio: 'Am doctor of Teeth',
  occupation: 'Nurse',
  expertise: 'Nurse'
}, process.env.secretKey);
const verify4 = jwt.verify(mentorUser4, process.env.secretKey);

const mentorUser5 = jwt.sign({
  id: 5,
  firstName: 'wihhh',
  lastName: 'kevin',
  email: 'kev@gmail.com',
  password: password,
  address: 'Kigali',
  bio: 'Am doctor of Teeth',
  occupation: 'Nurse',
  expertise: 'Nurse'
}, process.env.secretKey);
const verify5 = jwt.verify(mentorUser5, process.env.secretKey);

const signupUser = jwt.sign({
  firstname: 'willy',
  lastname: 'willo',
  email: 'siu@gmail.com',
  password: 'Rwanda1!1!',
  address: 'Kigali',
  bio: 'something',
  occupation: 'nurse',
  expertise: 'nurse'
}, process.env.secretKey);
const verifyNewUser = jwt.verify(signupUser, process.env.secretKey);

const existUser = {
  firstname: 'willo',
  lastname: 'willo',
  email: 'wilp@gmail.com',
  password: password,
  address: 'Kigali',
  bio: 'something',
  occupation: 'nurse',
  expertise: 'nurse'
};

const invalidToken = 'iJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoid2lsbH';


export default { user1, adminUser2, user3, mentorUser4, mentorUser5, verify1, verifyAdmin, verify3, verify4, verify5, invalidToken, verifyNewUser, existUser };
