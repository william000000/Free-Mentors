import express from 'express';
import mentorController from '../controllers/mentors.controller';
import userAuth from '../middleware/authUser';
import validateRoute from '../helpers/validateRoutes';

const router = express.Router();
const { validatePath } = validateRoute;

router.get('/', userAuth, mentorController.getAllMentor);
router.get('/:mentorId', userAuth, validatePath, mentorController.getOneMentor);

export default router;