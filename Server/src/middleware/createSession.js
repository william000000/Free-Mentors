import myQuery from '../services/queries';
import executor from '../services/config';

const createMentorship = async(req, res, next) => {
  try {
    const mentee = req.user; 
    const { questions, mentorId } = req.body;
    const isUserExist = await executor(myQuery.users.isUserExist, [mentee.email]);
    const isUserMentor = await executor(myQuery.users.isUserMentor, [mentee.email]);
    const isMentorExist = await executor(myQuery.users.isMentorExist, [mentorId]);
    const isMentorshipExist = await executor(myQuery.mentorships.isMentorshipExist, [mentorId, questions, mentee.id]);

    if (!isUserExist[0]) {
      return res.status(404).json({ status: 404, error: "User not exist" });
    }
    if (mentee.isAdmin === 'true') {
      return res.status(403).json({ status: 403, error: "admin not allowed to request session" });
    }
    if (isUserMentor[0]) {
      return res.status(403).json({ status: 403, error: "Mentor not allowed to request session" });
    }
 
    if (!isMentorExist[0]) {
      return res.status(404).json({ status: 404, error: 'Mentor not found' });
    }
    if (isMentorshipExist[0]) {
      return res.status(409).json({ status: 409, error: 'Session already requested with this mentor' });
    }
    next();
  } catch (err) {
    return res.status(400).json({ status: 400, error: err.message });
  }
};
export default createMentorship;