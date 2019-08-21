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
      data: findMentors 
    });
  }

  /**
  * Get Specific mentor
  * @param {object} req
  * @param {object} res
  */
  static getOneMentor(req, res) {
    const findMentor = mentors.find(mt => mt.mentorId == req.params.mentorId);
    if (findMentor) {
      return res.status(200).json({
        status: 200,
        data: findMentor 
      });
    }
    return res.status(404).json({
      status: 404,
      error: "Not found"
    });

  }
}

export default MentorController;