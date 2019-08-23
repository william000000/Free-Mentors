import express from 'express';
import reviewController from '../controllers/review.controller';
import userAuth from '../middleware/authUser';
import validateReviews from '../helpers/reviewValidation';

const router = express.Router();

const { validateReview } = validateReviews;

router.post('/:sessionId/review', validateReview, userAuth, reviewController.reviewMentor);
router.delete('/:sessionId/review', userAuth, reviewController.deleteReview);

export default router;