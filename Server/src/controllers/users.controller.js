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
    const isMentor = await executor(queries.mentors.isMentor, [req.body.email]);

    try {

      if (isUserExists[0] || isMentor[0]) {
        return res.status(409).json({
          status: 409,
          error: "user already exist in the system"
        });
      }


      const password = bcrypt.hashSync(req.body.password, 10);

      const { firstname, lastname, email, address, bio, occupation, expertise } = req.body;

      const resultdb = await executor(queries.users.insertUser, [firstname, lastname, email, password, address, bio, occupation, expertise]);


      const token = jwt.sign({
        userId: resultdb[0].id,
        email: resultdb[0].email,
        firstName: resultdb[0].firstname,
        lastName: resultdb[0].lastname,
        address: resultdb[0].address,
        occupation: resultdb[0].lastname,
        expertise: resultdb[0].lastname,
        isAdmin: resultdb[0].isadmin

      }, process.env.secretKey, { expiresIn: '28d' });

      res.status(201).json({
        status: 201,
        message: "User created succefully",
        data: {
          token,
          userId: resultdb[0].id,
          email: resultdb[0].email,
          firstName: resultdb[0].firstname,
          lastName: resultdb[0].lastname,
          address: resultdb[0].address,
          bio: resultdb[0].bio,
          occupation: resultdb[0].lastname,
          expertise: resultdb[0].lastname,
          isAdmin: resultdb[0].isadmin
        }
      });
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  /**
  * Sign in a user
  * @param {object} req
  * @param {object} res
  */
  static async signin(req, res) {
    const isUserExist = await executor(queries.users.isUserExist, [req.body.email]);
    const isMentor = await executor(queries.mentors.isMentor, [req.body.email]);
    try {
      if (!isUserExist[0] && !isMentor[0]) {
        return res.status(401).json({
          status: 401,
          message: "Email not exists"
        });
      }
      if (isUserExist[0]) {
        const password = bcrypt.compareSync(req.body.password, isUserExist[0].password);
        if (!password) {
          return res.status(401).json({
            status: 401,
            message: "Password not exists"
          });
        }
        let token = jwt.sign({
          userId: isUserExist[0].userid,
          email: isUserExist[0].email,
          isAdmin: isUserExist[0].isadmin
        }, process.env.secretKey);
        res.status(200).json({
          status: 200,
          message: "User is succefully logged in",
          data: { token }
        });
      } else {
        const password = bcrypt.compareSync(req.body.password, isMentor[0].password);
        if (!password) {
          return res.status(401).json({
            status: 401,
            message: "Password not exists"
          });
        }
        let token = jwt.sign({
          userId: isMentor[0].userid,
          email: isMentor[0].email,
          isAdmin: isMentor[0].isadmin
        }, process.env.secretKey, { expiresIn: '28d' });
        res.status(200).json({
          status: 200,
          message: "User is succefully logged in",
          data: { token }
        });
      }
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}
export default UserController;