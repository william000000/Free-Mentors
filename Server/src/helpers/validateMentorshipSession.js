const mentorId = /^[0-9]*$/;
const questions = /^[a-zA-Z0-9_ ]+[\W\S]*$/;

class ValidationSessionRequest {
  /**
  * Validate Mentee when requesting mentorship session
  * @param {object} req
  * @param {object} res
  * @param {object} next
  */
  static validateRequest(req, res, next) {
    try {
      if (!mentorId.test(req.body.mentorId)) throw new Error('invalid mentorId');
      if (!questions.test(req.body.questions)) throw new Error('invalid questions');
      next();
    } catch (err) {
      res.status(400).json({ status: 400, error: err.message });
    }
  }
}

export default ValidationSessionRequest;
