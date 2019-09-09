import executor from '../services/config';
import myQuery from '../services/queries';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

class AdminController {
  /**
  * Admin Change User to Mentor
  * @param {object} req
  * @param {object} res
  */
  static async changeUserToMentor(req, res) {

    try {
      const findUser = await executor(myQuery.users.findByid, [req.params.userId]);
      if (!findUser[0]) {
        return res.status(404).json({
          status: 404,
          error: 'User Not Found'
        });
      }
      if (findUser[0].isadmin === 'true') {
        return res.status(403).json({ status: 403, error: 'Admin can not be a mentor!'});
      }
      if(findUser[0].ismentor === 'true'){
        return res.status(409).json({ status: 409, error: 'User is currently a mentor!'});
      }
      let isMentor = 'true';
      const updateUser = await executor(myQuery.users.userToMentor, [isMentor, req.params.userId]);
      return res.status(200).json({
        status: 200,
        data: { message: "User Account changed to mentor successfully" }
      });
    } catch (err) {
      return res.status(400).json({status: 400, error: err.message});
    }
  }
}
export default AdminController;