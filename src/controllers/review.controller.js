import mentors from '../models/mentor.model';
import users from '../models/users.model';
import session from '../models/mentorship.model';
import review from '../models/review.model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

class ReviewController {
  /**
  * Review mentor after mentorship session
  * @param {object} req
  * @param {object} res
  */
  static reviewMentor(req, res) {
    const mentee = req.user;
    const isMentorshipSession = session.filter(s => s.sessionId == parseInt(req.params.sessionId));
    const isMentee = users.find(z => z.userId === parseInt(req.user.userId));
    
    const isMenteeWhoReq = session.filter(s => s.menteeId === parseInt(req.user.userId) && s.status === 'accepted');

    if (isMentorshipSession.length == 0) {
      return res.status(404).json({
        status: 404,
        error: 'this mentorship session not exist'
      });
    }
    if (isMentee) {
      if (isMenteeWhoReq[0].sessionId !== parseInt(req.params.sessionId)) {
        return res.status(403).json({
          status: 403,
          error: "You did not requested this mentorship! "
        });
      } else {
        const newReview = {
          sessionId: isMenteeWhoReq[0].sessionId,
          mentorId: isMenteeWhoReq[0].mentorId,
          menteeId: isMenteeWhoReq[0].menteeId,
          score: req.body.score,
          menteeFullName: isMentee.firstName + ' ' + isMentee.lastName,
          remark: req.body.remark
        };
        review.push(newReview);
        return res.status(200).json({
          status: 200,
          data: newReview
        });

      }
    } else {
      return res.status(403).json({
        status: 403,
        error: 'You are not mentee'
      });
    }

  }
}
export default ReviewController;