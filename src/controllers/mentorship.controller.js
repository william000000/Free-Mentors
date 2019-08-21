import mentors from '../models/mentor.model';
import session from '../models/mentorship.model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

class MentorShipController {
  /**
  * Create mentorship session
  * @param {object} req
  * @param {object} res
  */
  static createMentorship(req, res) {
    const mentee = req.user;
    const isMentorExist = mentors.find(m => m.mentorId === parseInt(req.body.mentorId));
    const isMentorshipExist = session.find(m => m.mentorId === parseInt(req.body.mentorId) && m.questions === req.body.questions && mentee.userId === m.menteeId);

    if (mentee.isAdmin == true) {
      return res.status(403).json({
        status: 403,
        error: "Admin not allowed to request session"
      });
    }

    if (isMentorExist) {
      if (isMentorshipExist) {
        return res.status(409).json({
          status: 409,
          error: 'Session already requested with this mentor'
        });
      }
      let newSession = {
        sessionId: session.length + 1,
        mentorId: isMentorExist.mentorId,
        mentorEmail: isMentorExist.email,
        menteeId: mentee.userId,
        questions: req.body.questions,
        menteeEmail: mentee.email,
        status: 'pending'
      };
      session.push(newSession);
      return res.status(200).json({
        status: 200,
        data: newSession
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Mentor not found'
    });

  }

  // /**
  // * Accept mentorship session request
  // * @param {object} req
  // * @param {object} res
  // */
  // static acceptMentorshipRequest(req, res) {
  //   const getMentor = req.user.email;
  //   console.log(getMentor);

  //   const isSessionRequested = session.find(s => s.sessionId == parseInt(req.params.sessionId));
  //   console.log(isSessionRequested);

  //   if (getMentor !== isSessionRequested.mentorEmail)
  //     return res.status(403).json({
  //       status: 403,
  //       error: 'Sorry, you are not allowed to accept this request'
  //     });
  //   if (!isSessionRequested) {
  //     return res.status(404).json({
  //       status: 404,
  //       error: 'No session request found'
  //     });
  //   }
  //   const result = session.map(s => {
  //     if (s.status === 'pending') s.status = 'accepted';
  //     return s;
  //   });
  //   return res.status(200).json({
  //     status: 200,
  //     data: result
  //   });
  // }

}

export default MentorShipController;