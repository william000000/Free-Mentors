const id = /^[0-9]$/;

class ValidationOfRoutes {
  /**
  * Validate routes
  * @param {object} req
  * @param {object} res
  * @param {object} next
  */
  static validatePath(req, res, next) {
    try {    
      if (!id.test(req.params.mentorId).toString()) throw new Error('invalid routes');      
      if (!id.test(req.params.sessionId).toString()) throw new Error('invalid routes');
      if (!id.test(req.params.userId).toString()) throw new Error('invalid routes');
      next();
    } catch (err) {
      res.status(400).json({status: 400,error: err.message});
    }
  }
}

export default ValidationOfRoutes;
