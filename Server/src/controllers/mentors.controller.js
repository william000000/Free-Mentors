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
    const findMentors = mentors.filter(c => c);
    let taker = new Array(findMentors);

    for (let i = 0; i < findMentors.length; i++) {
      let result = {
        mentorId: taker[0][i].mentorId,
        firstName: taker[0][i].firstName,
        lastName: taker[0][i].lastName,
        address: taker[0][i].address,
        email: taker[0][i].email,
        bio: taker[0][i].bio,
        occupation: taker[0][i].occupation,
        expertise: taker[0][i].expertise
      };
      taker[0][i] = result;
    }
    return res.status(200).json({
      status: 200,
      data: taker
    });
  }

  /**
  * Get Specific mentor
  * @param {object} req
  * @param {object} res
  */
  static getOneMentor(req, res) {
    const findMentor = mentors.find(mt => mt.mentorId == parseInt(req.params.mentorId));

    if (findMentor) {
      const { password, ...mentor } = findMentor;
      return res.status(200).json({
        status: 200,
        data: { ...mentor }
      });
    }
    return res.status(404).json({
      status: 404,
      error: "Not found"
    });

  }
}

export default MentorController;