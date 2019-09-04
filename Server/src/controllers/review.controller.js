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
    const { sessionId } = req.params;
    const isMentorshipSession = session.find(s => s.sessionId == parseInt(sessionId));
    const isMentee = users.find(z => z.userId === parseInt(req.user.userId));
    const isMenteeWhoReq = session.find(s => s.menteeId === parseInt(req.user.userId));
    const { remark, score } = req.body;

    if (!isMentorshipSession) {
      return res.status(404).json({
        status: 404,
        error: 'this mentorship session not exist'
      });
    }

    if (isMentee) {
      if (isMenteeWhoReq.sessionId !== parseInt(sessionId) || isMenteeWhoReq.status !== 'accepted') {
        return res.status(403).json({
          status: 403,
          error: "You did not requested this mentorship or not accepted already! "
        });
      } else {
        const newReview = {
          sessionId: isMenteeWhoReq.sessionId,
          mentorId: isMenteeWhoReq.mentorId,
          menteeId: isMenteeWhoReq.menteeId,
          score: score,
          menteeFullName: isMentee.firstName + ' ' + isMentee.lastName,
          remark: remark
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

  /**
   * Admin Delete a Review 
   * @param {object} req
   * @param {object} res
   */
  static deleteReview(req, res) {
    const loggedInChecker = req.user.isAdmin;
    const { sessionId } = req.params;
    const isReview = review.find(s => s.sessionId == parseInt(sessionId));
    const isAdmin = users.find(z => z.isAdmin === true && req.user.isAdmin === true);
    const { reason } = req.body;
    if (!isAdmin)
      return res.status(403).json({
        status: 403,
        error: 'You are not the Admin'
      });
    if (!isReview)
      return res.status(404).json({
        status: 404,
        error: 'The Review not exist'
      });
    review.splice(review.indexOf(isReview), 1);
    return res.status(200).json({
      status: 200,
      message: 'Review deleted successfully',
      data: { reason }
    });
  }
}
export default ReviewController;