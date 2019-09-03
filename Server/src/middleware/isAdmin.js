import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const IsAdmin = (req, res, next) => {
  try {
    if (!req.headers['auth'])
      throw new Error('Insert token');
    jwt.verify(req.headers['auth'], process.env.secretKey, (err, result) => {
      if (err) {
        res.status(401).json({
          status: 401,
          error: 'Invalid token'
        });
      } else {
        if (result.isAdmin === false) {
          return res.status(403).json({
            status: 403,
            error: 'Forbidden'
          });
        }
        next();
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      error: err.message
    });
  }

};
export default IsAdmin;