import express from 'express';
import adminController from '../controllers/admin.controller';
import checkIsAdmin from '../middleware/isAdmin';
import validateRoute from '../helpers/validateRoutes';

const router = express.Router();
const { validatePath } = validateRoute;
router.patch('/:userId', checkIsAdmin, validatePath, adminController.changeUserToMentor);

export default router;