import express from 'express';
import userController from '../controllers/users.controller';
import userValidations from '../validations/userValidation';

const router = express.Router();

const { validateSignup , validateSignin } = userValidations;

router.post('/signup', validateSignup, userController.signup);
router.post('/signin', validateSignin ,userController.signin);
export default router;