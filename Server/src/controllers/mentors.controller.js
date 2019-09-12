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
      return res.status(200).json({ status: 200, message: 'mentors retrieved succefully', data: findMentors });
    } catch (err) {
      return res.status(400).json({ status: 400, error: err.message });
    }
  }

  /**
  * Get Specific mentor
  * @param {object} req
  * @param {object} res
  */
  static async getOneMentor(req, res) {
    try {
      const { mentorId } = req.params;
      const findMentor = await executor(myQuery.users.findOneMentor, [mentorId]);

      if (findMentor[0]) {
        const { password, isadmin, ...mentor } = findMentor[0];
        return res.status(200).json({ status: 200, message: 'mentor retrieved succefully', data: mentor });
      }
      return res.status(404).json({ status: 404, error: "Not found" });
    } catch (err) {
      return res.status(400).json({ status: 400, error: err.message });
    }
  }
}

export default MentorController;