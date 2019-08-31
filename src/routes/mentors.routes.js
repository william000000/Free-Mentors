import express from 'express';
import mentorController from '../controllers/mentors.controller';
import userAuth from '../middleware/authUser';

const router = express.Router();

router.get('/', userAuth, mentorController.getAllMentor);
router.get('/:mentorId', userAuth, mentorController.getOneMentor);

export default router;