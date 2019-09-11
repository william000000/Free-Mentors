import express from 'express';
import reviewController from '../controllers/review.controller';
import userAuth from '../middleware/authUser';
import validateReviews from '../helpers/reviewValidation';

const router = express.Router();

const { validateReview, validateDeleteReview } = validateReviews;

const methodNotCorrect = (req, res) => {
  res.status(405).json({ status: 405, error: 'Method is Incorrect' });
};
router.route('/:sessionId/review')
  .post(validateReview, userAuth, reviewController.reviewMentor)
  .delete(validateDeleteReview, userAuth, reviewController.deleteReview)
  .all(methodNotCorrect);



export default router;