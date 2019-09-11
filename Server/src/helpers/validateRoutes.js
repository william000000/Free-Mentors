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
      if (!id.test(req.params.mentorId).toString() || parseInt(req.params.mentorId)==0) throw new Error('invalid param value');      
      if (!id.test(req.params.sessionId).toString() || parseInt(req.params.sessionId)==0) throw new Error('invalid param value');
      if (!id.test(req.params.userId).toString() || parseInt(req.params.userId)==0) throw new Error('invalid param value');
      next();
    } catch (err) {
      res.status(400).json({status: 400,error: err.message});
    }
  }
}

export default ValidationOfRoutes;
