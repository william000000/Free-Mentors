import myQuery from '../services/queries';
import executor from '../services/config';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const mentorshipRequest = async (req, res, next) => {
  try {
    const getMentor = req.user.email;
    const { sessionId } = req.params;
    const isSessionRequested = await executor(myQuery.mentorships.isSessionRequested, [sessionId]);
    if (!isSessionRequested[0]) {
      return res.status(404).json({ status: 404, error: "Session not found" });
    }
    if (getMentor !== isSessionRequested[0].mentoremail) {
      return res.status(403).json({ status: 403, error: 'Sorry, you are not allowed to react on this request' });
    }
    next();
  } catch (err) {
    return res.status(400).json({ status: 400, error: err.message });
  }
};
export default mentorshipRequest;