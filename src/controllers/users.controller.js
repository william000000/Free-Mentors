import users from '../models/users.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

class UserController {
  /**
  * Sign up a user
  * @param {object} req
  * @param {object} res
  */
  static signup(req, res) {
    const isUserExist = users.find(user => user.email === req.body.email);

    if (isUserExist) {
      return res.status(409).json({
        status: 409,
        error: "user already exist in the system"
      });
    }
    const password = bcrypt.hashSync(req.body.password, 10);
    const newUser = {
      userId: users.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: password,
      address: req.body.address,
      bio: req.body.bio,
      occupation: req.body.occupation,
      expertise: req.body.expertise,
      isAdmin: false
    };
    users.push(newUser);
    const token = jwt.sign({
      userId: newUser.userId,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      bio: newUser.bio,
      occupation: newUser.occupation,
      expertise: newUser.expertise,
      isAdmin: false

    }, process.env.secretKey, { expiresIn: '28d' });
    res.status(201).json({
      status: 201,
      message: "User created succefully",
      data: {
        token: token,
        message: "User created succefully",
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        address: newUser.address,
        bio: newUser.bio,
        occupation: newUser.occupation,
        expertise: newUser.expertise,
        isAdmin: false

      }
    });
  }

  /**
  * Sign in a user
  * @param {object} req
  * @param {object} res
  */
  static signin(req, res) {
    const isUserExist = users.find(user => user.email === req.body.email);
    if (!isUserExist) {
      return res.status(401).json({
        status: 401,
        message: "Email not exists"
      });
    }

    const password = bcrypt.compareSync(req.body.password, isUserExist.password);
    if (!password) {
      return res.status(401).json({
        status: 401,
        message: "Password not exists"
      });
    }
    const token = jwt.sign({
      userId: isUserExist.userId,
      email: isUserExist.email,
      isAdmin: isUserExist.isAdmin
    }, process.env.secretKey, { expiresIn: '28d' });

    res.status(200).json({
      status: 200,
      message: "User is succefully logged in",
      data: { token }
    });
  }
}
export default UserController;