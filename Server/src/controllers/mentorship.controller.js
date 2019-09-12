import mentors from '../models/mentor.model';
import session from '../models/mentorship.model';
import review from '../models/review.model';
import myQuery from '../services/queries';
import executor from '../services/config';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

class MentorShipController {
  /**
  * Create mentorship session
  * @param {object} req
  * @param {object} res
  */
  static async createMentorship(req, res) {
    try {
      const mentee = req.user;
      const { questions, mentorId } = req.body;
      const isMentorExist = await executor(myQuery.users.isMentorExist, [mentorId]);
      const isMentorshipExist = await executor(myQuery.mentorships.isMentorshipExist, [mentorId, questions, mentee.id]);

      const newSession = await executor(myQuery.mentorships.createMentorship, [mentorId, isMentorExist[0].email, mentee.id, questions, mentee.email]);
      return res.status(200).json({ status: 200, message: "mentorship successfully created", data: newSession });
    } catch (err) {
      return res.status(400).json({ status: 400, error: err.message });
    }
  }
  /**
  * Accept mentorship session request
  * @param {object} req
  * @param {object} res
  */
  static async acceptMentorshipRequest(req, res) {
    try {
      const { sessionId } = req.params;
      const isSessionRequested = await executor(myQuery.mentorships.isSessionRequested, [sessionId]);
      if (isSessionRequested[0].status === 'accepted') {
        return res.status(409).json({ status: 409, error: 'Session Already accepted' });
      }
      const result = await executor(myQuery.mentorships.acceptSession, [sessionId]);
      return res.status(200).json({ status: 200, message: "accepted successfully", data: result[0] });

    } catch (err) {
      return res.status(400).json({ status: 400, error: err.message });
    }
  }
  /**
  * Reject mentorship session request
  * @param {object} req
  * @param {object} res
  */
  static async rejectMentorshipRequest(req, res) {
    try {
      const { sessionId } = req.params;
      const isSessionRequested = await executor(myQuery.mentorships.isSessionRequested, [sessionId]);
      if (isSessionRequested[0].status === 'rejected') {
        return res.status(409).json({ status: 409, error: 'Session Already rejected' });
      }
      const result = await executor(myQuery.mentorships.rejectSession, [sessionId]);
      return res.status(200).json({ status: 200, message: "rejected successfully", data: result[0] });
    } catch (err) {
      return res.status(400).json({ status: 400, error: err.message });
    }
  }
  /**
  * View all mentorship session request upon(Mentee and Mentor)
  * @param {object} req
  * @param {object} res
  */
  static async viewAllMentorshipSessionRequest(req, res) {
    try {
      const whoLoggedIn = req.user.email;
      const sessionUser = await executor(myQuery.mentorships.allSessionsForMentee, [whoLoggedIn]);
      const sessionMentor = await executor(myQuery.mentorships.allSessionsForMentor, [whoLoggedIn]);

      if (!sessionMentor[0] && !sessionUser[0]) {
        return res.status(404).json({ status: 404, data: 'No Mentorship session found!' });
      }
      if (sessionUser[0]) {
        return res.status(200).json({ status: 200, message: "retrieved successfully", data: sessionUser });
      }
      return res.status(200).json({ status: 200, message: "retrieved successfully", data: sessionMentor });
    } catch (err) {
      return res.status(400).json({ status: 400, error: err.message });
    }
  }

}
export default MentorShipController;