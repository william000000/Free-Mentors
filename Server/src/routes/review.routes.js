import express from 'express';
import reviewController from '../controllers/review.controller';
import userAuth from '../middleware/authUser';
import validateReviews from '../helpers/reviewValidation';

const router = express.Router();

const { validateReview, validateDeleteReview } = validateReviews;

router.post('/:sessionId/review', validateReview, userAuth, reviewController.reviewMentor);
router.delete('/:sessionId/review', validateDeleteReview, userAuth, reviewController.deleteReview);

export default router;