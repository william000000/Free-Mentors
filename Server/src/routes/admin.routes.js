import express from 'express';
import adminController from '../controllers/admin.controller';
import checkIsAdmin from '../middleware/isAdmin';
import validateRoute from '../helpers/validateRoutes';

const router = express.Router();
const { validatePath } = validateRoute;
const methodNotCorrect = (req, res) => {
  res.status(405).json({ status: 405, error: 'Method is Incorrect' });
};
router.route('/:userId')
  .patch(checkIsAdmin, validatePath, adminController.changeUserToMentor)
  .all(methodNotCorrect);

export default router;