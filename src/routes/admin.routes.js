import express from 'express';
import adminController from '../controllers/admin.controller';
import checkIsAdmin from '../middleware/isAdmin';

const router = express.Router();

router.patch('/:userId', checkIsAdmin, adminController.changeUserToMentor);

export default router;