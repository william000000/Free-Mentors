import express from 'express';
import mentorShipController from '../controllers/mentorship.controller';
import userAuth from '../middleware/authUser';
import validateSession from '../helpers/validateMentorshipSession';
import validateRoute from '../helpers/validateRoutes';
const router = express.Router();

const { validateRequest } = validateSession;
const { validatePath } = validateRoute;
router.post('/', validateRequest, userAuth, mentorShipController.createMentorship);
router.patch('/:sessionId/accept', userAuth, validatePath, mentorShipController.acceptMentorshipRequest);
router.patch('/:sessionId/reject', userAuth, validatePath, mentorShipController.rejectMentorshipRequest);
router.get('/', userAuth, mentorShipController.viewAllMentorshipSessionRequest);

export default router;