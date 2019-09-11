import express from 'express';
import mentorController from '../controllers/mentors.controller';
import userAuth from '../middleware/authUser';
import validateRoute from '../helpers/validateRoutes';

const router = express.Router();
const { validatePath } = validateRoute;
const methodNotCorrect = (req, res) => {
  res.status(405).json({ status: 405, error: 'Method is Incorrect' });
};

router.route('/')
  .get(userAuth, mentorController.getAllMentor)
  .all(methodNotCorrect);

router.route('/:mentorId')
  .get(userAuth, validatePath, mentorController.getOneMentor)
  .all(methodNotCorrect);

export default router;