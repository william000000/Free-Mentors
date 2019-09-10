import express from 'express';
import userController from '../controllers/users.controller';
import userValidations from '../helpers/userValidation';

const router = express.Router();

const { validateSignup, validateSignin } = userValidations;
const methodNotCorrect = (req, res) => {
  res.status(405).json({ status: 405, error: 'Method is Incorrect' });
};

router.route('/signup')
  .post(validateSignup, userController.signup)
  .all(methodNotCorrect);

router.route('/signin')
  .post(validateSignin, userController.signin)
  .all(methodNotCorrect);

export default router;