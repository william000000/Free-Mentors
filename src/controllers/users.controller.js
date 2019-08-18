import users from '../modals/modal.users';
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
      expertise: req.body.expertise
    };
    users.push(newUser);
    const token = jwt.sign({
      userId: newUser.userId,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      bio: newUser.bio,
      occupation: newUser.occupation,
      expertise: newUser.expertise

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
        expertise: newUser.expertise

      }
    });
  }
}
export default UserController;