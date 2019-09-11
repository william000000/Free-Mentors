import express from 'express';
import mentorShipController from '../controllers/mentorship.controller';
import userAuth from '../middleware/authUser';
import validateSession from '../helpers/validateMentorshipSession';
import validateRoute from '../helpers/validateRoutes';
import reactToSession from '../middleware/checkSession';
import createMentorship from '../middleware/createSession';
const router = express.Router();

const { validateRequest } = validateSession;
const { validatePath } = validateRoute;
const methodNotCorrect = (req, res) => {
  res.status(405).json({ status: 405, error: 'Method is Incorrect' });
};

router.route('/')
  .get(userAuth, mentorShipController.viewAllMentorshipSessionRequest)
  .post(validateRequest, userAuth,createMentorship, mentorShipController.createMentorship)
  .all(methodNotCorrect);

router.route('/:sessionId/accept')
  .patch(userAuth, validatePath,reactToSession, mentorShipController.acceptMentorshipRequest)
  .all(methodNotCorrect);

router.route('/:sessionId/reject')
  .patch(userAuth, validatePath,reactToSession, mentorShipController.rejectMentorshipRequest)
  .all(methodNotCorrect);

export default router;