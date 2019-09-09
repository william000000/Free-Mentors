const score = /^[1-5]$/;
const remark = /^[a-zA-Z0-9_ ]+[\W\S]*$/;
const reason = /^[a-zA-Z0-9_ ]+[\W\S]*$/;

class ValidationReview {
  /**
  * Validate review Mentor after mentorship session
  * @param {object} req
  * @param {object} res
  * @param {object} next
  */
  static validateReview(req, res, next) {
    try {
      if (!score.test(req.body.score)) throw new Error('invalid score');
      if (!remark.test(req.body.remark)) throw new Error('invalid remark');
      next();
    } catch (err) {
      res.status(400).json({ status: 400, error: err.message });
    }
  }
  /**
  * Validate Delete review 
  * @param {object} req
  * @param {object} res
  * @param {object} next
  */
  static validateDeleteReview(req, res, next) {
    try {
      req.body.reason = req.body.reason.trim();
      if (!reason.test(req.body.reason)) throw new Error('invalid reason');
      next();
    } catch (err) {
      res.status(400).json({ status: 400, error: err.message });
    }
  }
}

export default ValidationReview;
