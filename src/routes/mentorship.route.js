import express from 'express';
import mentorShipController from '../controllers/mentorship.controller';
import userAuth from '../middleware/authUser';
import validateSession from '../helpers/validateMentorshipSession';

const router = express.Router();

const { validateRequest } = validateSession;

router.post('/', validateRequest, userAuth, mentorShipController.createMentorship);
router.patch('/:sessionId/accept', userAuth, mentorShipController.acceptMentorshipRequest);

export default router;