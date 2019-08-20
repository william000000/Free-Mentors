import mentors from '../models/mentor.model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

class MentorController {
  /**
  * Get all mentors
  * @param {object} req
  * @param {object} res
  */
  static getAllMentor(req, res) {
    const findMentors = mentors;

    return res.status(200).json({
      status: 200,
      data: { findMentors }
    });
  }
}
export default MentorController;