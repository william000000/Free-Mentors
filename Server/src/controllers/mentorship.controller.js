import mentors from '../models/mentor.model';
import session from '../models/mentorship.model';
import review from '../models/review.model';

import executor from '../services/config';
import myQuery from '../services/queries';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

class MentorShipController {
  /**
  * Create mentorship session
  * @param {object} req
  * @param {object} res
  */
  static async createMentorship(req, res) {
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

  /**
  * Accept mentorship session request
  * @param {object} req
  * @param {object} res
  */
  static acceptMentorshipRequest(req, res) {
    const getMentor = req.user.email;
    let taker = session;
    const isSessionRequested = taker.find(s => s.sessionId == parseInt(req.params.sessionId));
    taker = new Array(isSessionRequested);
    if (isSessionRequested) {
      if (getMentor !== isSessionRequested.mentorEmail) {
        return res.status(403).json({
          status: 403,
          error: 'Sorry, you are not allowed to accept this request'
        });
      } else {
        if (isSessionRequested.status === 'accepted') {
          return res.status(400).json({
            status: 400,
            error: 'Session Already accepted'
          });
        } else {
          const result = taker.map(s => {
            s.status = 'accepted';
            return s;
          });
          return res.status(200).json({
            status: 200,
            data: result
          });
        }
      }
    }
    return res.status(404).json({
      status: 404,
      error: "Session not found"
    });

  }
  /**
  * Reject mentorship session request
  * @param {object} req
  * @param {object} res
  */
  static rejectMentorshipRequest(req, res) {
    const getMentor = req.user.email;
    let taker = session;
    const isSessionRequested = taker.find(s => s.sessionId == parseInt(req.params.sessionId));
    taker = new Array(isSessionRequested);
    if (isSessionRequested) {
      if (getMentor !== isSessionRequested.mentorEmail) {
        return res.status(403).json({
          status: 403,
          error: 'Sorry, you are not allowed to reject this request'
        });
      } else {
        if (isSessionRequested.status === 'rejected') {
          return res.status(400).json({
            status: 400,
            error: 'Session Already rejected'
          });
        } else {
          const result = taker.map(s => {
            s.status = 'rejected';
            return s;
          });
          return res.status(200).json({
            status: 200,
            data: result
          });
        }
      }
    }
    return res.status(404).json({
      status: 404,
      error: "Session not found"
    });
  }
  /**
  * View all mentorship session request upon(Mentee and Mentor)
  * @param {object} req
  * @param {object} res
  */
  static viewAllMentorshipSessionRequest(req, res) {
    const whoLoggedIn = req.user.email;
    const Sessions = session.filter(s => s.mentorEmail === whoLoggedIn || s.menteeEmail === whoLoggedIn);

    if (Sessions.length > 0) { return res.status(200).json({ status: 200, data: Sessions }); }
    return res.status(404).json({ status: 404, data: 'No Mentorship session found!' });
  }
}
export default MentorShipController;