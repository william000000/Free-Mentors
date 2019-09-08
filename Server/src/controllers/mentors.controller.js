import myQuery from '../services/queries';
import executor from '../services/config';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

class MentorController {
  /**
  * Get all mentors
  * @param {object} req
  * @param {object} res
  */
  static async getAllMentor(req, res) {
    try {
      const findMentors = await executor(myQuery.users.findAllMentors);
      return res.status(200).json({ status: 200, data: findMentors });
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }


}

export default MentorController;