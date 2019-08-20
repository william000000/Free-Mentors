import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyUser = (req, res, next) => {
  jwt.verify(req.headers['auth'], process.env.secretKey, (err, result) => {
    if (err) {
      res.status(401).json({
        status: 401,
        error: 'Invalid token'
      });
    } else {
      req.user = result;
      next();
    }
  });
};
export default verifyUser;