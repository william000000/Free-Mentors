import express from 'express';
import userController from '../controllers/users.controller';
import userValidations from '../validations/userValidation';

const router = express.Router();

const { validateSignup } = userValidations;

router.post('/signup', validateSignup, userController.signup);

export default router;