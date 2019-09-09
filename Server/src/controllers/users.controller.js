import users from '../models/users.model';
import mentors from '../models/mentor.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import executor from '../services/config';
import queries from '../services/queries';

dotenv.config();

class UserController {
  /**
  * Sign up a user
  * @param {object} req
  * @param {object} res
  */
  static async signup(req, res) {
    const isUserExists = await executor(queries.users.isUserExist, [req.body.email]);
    try {
      if (isUserExists[0]) {
        return res.status(409).json({ status: 409, error: "user already exist in the system" });
      }
      const passwordHashed = bcrypt.hashSync(req.body.password, 10);
      const { firstname, lastname, email, address, bio, occupation, expertise } = req.body;
      const resultdb = await executor(queries.users.insertUser, [firstname, lastname, email, passwordHashed, address, bio, occupation, expertise]);
      const token = jwt.sign({
        id: resultdb[0].id,
        email: resultdb[0].email,
        isAdmin: resultdb[0].isadmin
      }, process.env.secretKey);

      const { password, ...data } = resultdb[0];
      res.status(201).json({
        status: 201,
        message: "User created succefully", token, data
      });
    } catch (err) {
      return res.status(400).json({ status: 400, error: err.message });
    }
  }

  /**
  * Sign in a user
  * @param {object} req
  * @param {object} res
  */
  static async signin(req, res) {
    const isUserExist = await executor(queries.users.isUserExist, [req.body.email]);
    try {
      if (!isUserExist[0]) {
        return res.status(401).json({ status: 401, message: "Incorrect credential" });
      }
      const password = bcrypt.compareSync(req.body.password, isUserExist[0].password);
      if (!password) {
        return res.status(401).json({ status: 401, message: "Incorrect credential" });
      }
      let token = jwt.sign({
        id: isUserExist[0].id,
        email: isUserExist[0].email,
        isAdmin: isUserExist[0].isadmin,
        isMentor: isUserExist[0].ismentor
      }, process.env.secretKey);
      res.status(200).json({
        status: 200, message: "User is succefully logged in", data: { token }
      });

    } catch (err) {
      return res.status(400).json({ status: 400, error: err.message });
    }
  }
}
export default UserController;